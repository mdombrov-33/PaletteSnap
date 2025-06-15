import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  checkedBgColor?: string
  uncheckedBgColor?: string
  thumbColor?: string
}

function Switch({
  className,
  checkedBgColor,
  uncheckedBgColor,
  thumbColor,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className
      )}
      style={{
        backgroundColor: props.checked ? checkedBgColor : uncheckedBgColor,
        padding: '2px',
        border: '1px solid rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="pointer-events-none block w-5 h-5 rounded-full shadow-md transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
        style={{
          backgroundColor: thumbColor,
        }}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
