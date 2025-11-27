import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Client } from 'pg';

async function main() {
    const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL_UNPOOLED or DATABASE_URL must be set');
    }

    const client = new Client({ connectionString });

    try {
        await client.connect();

        const agenciesPath = path.join(process.cwd(), '..', 'agencies_agency_rows.csv');

        if (!fs.existsSync(agenciesPath)) {
            throw new Error(`Agencies CSV not found at ${agenciesPath}`);
        }

        const agenciesFile = fs.readFileSync(agenciesPath, 'utf8');
        const agenciesResult = Papa.parse(agenciesFile, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        const agencies = agenciesResult.data as any[];

        const contactsPath = path.join(process.cwd(), '..', 'contacts_contact_rows.csv');

        if (!fs.existsSync(contactsPath)) {
            throw new Error(`Contacts CSV not found at ${contactsPath}`);
        }

        const contactsFile = fs.readFileSync(contactsPath, 'utf8');
        const contactsResult = Papa.parse(contactsFile, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        const contacts = contactsResult.data as any[];

        for (const agency of agencies) {
            if (!agency.id) continue;

            const query = `
                INSERT INTO agencies (
                    id, name, state, state_code, type, population, website,
                    total_schools, total_students, mailing_address, grade_span,
                    locale, csa_cbsa, domain_name, physical_address, phone,
                    status, student_teacher_ratio, supervisory_union, county,
                    created_at, updated_at
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
                    $15, $16, $17, $18, $19, $20, $21, $22
                )
                ON CONFLICT (id) DO NOTHING
            `;

            const values = [
                agency.id,
                agency.name || 'Unknown Agency',
                agency.state,
                agency.state_code,
                agency.type,
                agency.population ? parseInt(String(agency.population)) : null,
                agency.website,
                agency.total_schools ? parseInt(String(agency.total_schools)) : null,
                agency.total_students ? parseInt(String(agency.total_students)) : null,
                agency.mailing_address,
                agency.grade_span,
                agency.locale,
                agency.csa_cbsa,
                agency.domain_name,
                agency.physical_address,
                agency.phone ? String(agency.phone) : null,
                agency.status,
                agency.student_teacher_ratio ? parseFloat(String(agency.student_teacher_ratio)) : null,
                agency.supervisory_union,
                agency.county,
                agency.created_at ? new Date(agency.created_at) : new Date(),
                agency.updated_at ? new Date(agency.updated_at) : new Date(),
            ];

            await client.query(query, values);
        }

        for (const contact of contacts) {
            if (!contact.id) continue;

            let agencyId = contact.agency_id;
            if (agencyId) {
                const agencyCheck = await client.query('SELECT id FROM agencies WHERE id = $1', [agencyId]);
                if (agencyCheck.rows.length === 0) {
                    agencyId = null;
                }
            }

            const query = `
                INSERT INTO contacts (
                    id, first_name, last_name, email, phone, title,
                    email_type, contact_form_url, department, agency_id,
                    firm_id, created_at, updated_at
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
                )
                ON CONFLICT (id) DO NOTHING
            `;

            const values = [
                contact.id,
                contact.first_name,
                contact.last_name,
                contact.email,
                contact.phone ? String(contact.phone) : null,
                contact.title,
                contact.email_type,
                contact.contact_form_url,
                contact.department,
                agencyId,
                contact.firm_id,
                contact.created_at ? new Date(contact.created_at) : new Date(),
                contact.updated_at ? new Date(contact.updated_at) : new Date(),
            ];

            await client.query(query, values);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main();
