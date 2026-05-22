import React from "react";

type BadgeNumberProps = React.SVGProps<SVGSVGElement> & {
  number: number | string;
};

const BadgeNumber = React.forwardRef<SVGSVGElement, BadgeNumberProps>(
  ({ number, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {/* Badge Shape */}
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />

        {/* Number inside badge */}
        <text
          x="12"
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="currentColor"
          stroke="none"
          fontWeight="bold"
        >
          {number}
        </text>
      </svg>
    );
  }
);

BadgeNumber.displayName = "BadgeNumber";

export default BadgeNumber;