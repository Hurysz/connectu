import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 40"
      width="110"
      height="35"
      {...props}
    >
      <text
        x="0"
        y="30"
        className="font-headline"
        fontSize="30"
        fontWeight="bold"
        fill="currentColor"
      >
        ConnectU
      </text>
    </svg>
  );
}
