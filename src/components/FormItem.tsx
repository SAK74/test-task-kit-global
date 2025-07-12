import type { FC, HTMLProps } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";

export const CustomFormItem = <T extends HTMLProps<HTMLElement>>({
  inputProps,
  label,
  Element,
}: {
  inputProps?: T;
  label?: string;
  Element: FC<T>;
}) => (
  <FormItem>
    <FormLabel className="capitalize">{label ?? inputProps?.name}</FormLabel>
    <FormControl>
      <Element {...(inputProps as T)} />
    </FormControl>
    <FormMessage />
  </FormItem>
);
