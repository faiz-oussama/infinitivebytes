'use client'

import { Header } from '@/components/header'
import { GL } from '@/components/gl'
import { Leva } from 'leva'
import { useState } from 'react'
import { Database, Filter, FileDown, Zap, Shield, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function FeaturesPage() {
    const [hovering, setHovering] = useState(false);

    const features = [
        {
            icon: Database,
            title: 'Comprehensive Data',
            description: 'Access detailed information on agencies and contacts across all states'
        },
        {
            icon: Filter,
            title: 'Advanced Filtering',
            description: 'Search and filter by state, agency type, population, and more'
        },
        {
            icon: FileDown,
            title: 'CSV Export',
            description: 'Export your filtered results to CSV for further analysis (Pro)'
        },
        {
            icon: Zap,
            title: 'Daily Limits',
            description: 'Smart rate limiting ensures fair usage with 50 views per day on Free tier'
        },
        {
            icon: Shield,
            title: 'Secure Access',
            description: 'Authentication-protected dashboard with role-based permissions'
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Visualize agency data with interactive charts and statistics (Pro)'
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            <GL hovering={hovering} />
            <Leva hidden />
            <Header />

            <div className="container mx-auto px-4 py-24 space-y-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center space-y-6 pt-8">
                    <div className="inline-block">
                        <span className="bg-white/10 text-white/90 backdrop-blur-sm font-mono text-sm px-4 py-2 rounded-full border border-white/20">
                            POWERFUL FEATURES
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-sentient text-white">
                        Everything You <i className="font-light">Need</i>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto font-mono">
                        Professional tools designed for efficient agency and contact management
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all group"
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                        >
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center space-y-6 pt-8">
                    <h2 className="text-3xl md:text-4xl font-sentient text-white">
                        Ready to <i className="font-light">get started</i>?
                    </h2>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/sign-in">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 font-semibold px-8"
                                onMouseEnter={() => setHovering(true)}
                                onMouseLeave={() => setHovering(false)}
                            >
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/pricing">
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-white/20 text-white hover:bg-white/10 px-8"
                            >
                                View Pricing
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
