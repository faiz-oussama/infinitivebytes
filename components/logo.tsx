export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M60 100C82.0914 100 100 82.0914 100 60C100 37.9086 82.0914 20 60 20C37.9086 20 20 37.9086 20 60C20 82.0914 37.9086 100 60 100Z" stroke="white" strokeWidth="8" />
            <path d="M48 76V56M60 76V44M72 76V64" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>
    );
};
