"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MoonIcon, SunIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Monitor } from "lucide-react"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ThemeSwitcherProps extends PopoverTriggerProps { }

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const [open, setOpen] = React.useState(false)
    const { setTheme, theme } = useTheme()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size={'sm'} variant="outline" role="combobox" aria-expanded={open} aria-label="Select a team" className={cn("justify-between text-xs capitalize", className)}>
                    <SunIcon className="mr-2 h-3 w-3" />
                    {theme}
                    <CaretSortIcon className="ml-2 h-3 w-3 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-fit">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => setTheme('dark')} className="text-xs">
                                <MoonIcon className="h-3 w-3 mr-2 " />
                                Dark
                                <CheckIcon className={cn("ml-2 h-4 w-4", 'dark' == theme ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                            <CommandItem onSelect={() => setTheme('light')} className="text-xs">
                                <SunIcon className="h-3 w-3 mr-2 " />
                                Light
                                <CheckIcon className={cn("ml-2 h-4 w-4", 'light' == theme ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                            <CommandItem onSelect={() => setTheme('system')} className="text-xs">
                                <Monitor className="h-3 w-3 mr-2 " />
                                System
                                <CheckIcon className={cn("ml-2 h-4 w-4", 'system' == theme ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
