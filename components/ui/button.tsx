
import * as React from "react"
import { cn } from "@/lib/utils"



const buttonVariants = (variant: string = 'default', size: string = 'default') => {
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    let v = ""
    switch (variant) {
        case 'default': v = "bg-primary text-primary-foreground hover:bg-primary/90"; break;
        case 'destructive': v = "bg-destructive text-destructive-foreground hover:bg-destructive/90"; break;
        case 'outline': v = "border border-input bg-background hover:bg-accent hover:text-accent-foreground"; break;
        case 'secondary': v = "bg-secondary text-secondary-foreground hover:bg-secondary/80"; break;
        case 'ghost': v = "hover:bg-accent hover:text-accent-foreground"; break;
        case 'link': v = "text-primary underline-offset-4 hover:underline"; break;
        default: v = "bg-primary text-primary-foreground hover:bg-primary/90";
    }

    let s = ""
    switch (size) {
        case 'default': s = "h-10 px-4 py-2"; break;
        case 'sm': s = "h-9 rounded-md px-3"; break;
        case 'lg': s = "h-11 rounded-md px-8"; break;
        case 'icon': s = "h-10 w-10"; break;
        default: s = "h-10 px-4 py-2";
    }

    return cn(base, v, s)
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants(variant, size), className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
