import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				gaming: {
					gold: 'hsl(var(--gaming-gold))',
					'gold-dark': 'hsl(var(--gaming-gold-dark))',
					navy: 'hsl(var(--gaming-navy))',
					'navy-light': 'hsl(var(--gaming-navy-light))',
					'navy-lighter': 'hsl(var(--gaming-navy-lighter))'
				},
				casino: {
					gold: 'hsl(var(--casino-gold))',
					silver: 'hsl(var(--casino-silver))',
					green: 'hsl(var(--casino-green))',
					red: 'hsl(var(--casino-red))'
				},
				reel: {
					bg: 'hsl(var(--reel-bg))',
					symbol: 'hsl(var(--reel-symbol))',
					winning: 'hsl(var(--reel-winning))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'gold-glow': {
					'0%': { boxShadow: '0 0 5px hsl(var(--casino-gold) / 0.5)' },
					'100%': { boxShadow: '0 0 20px hsl(var(--casino-gold) / 0.8)' }
				},
				'pulse-win': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' }
				},
				'spin-reel': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-200%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gold-glow': 'gold-glow 2s ease-in-out infinite alternate',
				'pulse-win': 'pulse-win 0.5s ease-in-out',
				'spin-reel': 'spin-reel var(--spin-duration) var(--spin-easing)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
