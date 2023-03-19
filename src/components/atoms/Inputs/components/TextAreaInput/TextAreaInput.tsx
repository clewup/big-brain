import React from "react";
import { FieldAttributes, FormikProps } from "formik";
import { FormGroup, FormLabel, InputAdornment, TextField } from "@mui/material";
import { useTheme } from "next-themes";

interface IProps {
  field?: FieldAttributes<any>;
  form?: FormikProps<any>;
  label?: string;
  disabled?: boolean;
  value?: unknown;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  icon?: JSX.Element;
  rows?: number;
}

const TextAreaInput: React.FC<IProps> = ({
  field,
  form,
  label,
  disabled,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  rows = 4,
}) => {
  const { theme } = useTheme();

  return (
    <FormGroup>
      <FormLabel sx={{ color: theme === "light" ? "black" : "white" }}>
        {label}
      </FormLabel>
      <TextField
        {...field}
        error={form?.touched[field.name] && form?.errors[field.name]}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant={"standard"}
        helperText={form?.errors[field.name]}
        InputProps={{
          style: {
            backgroundColor: "white",
            textAlign: "center",
          },
          startAdornment: (
            <InputAdornment position={"end"}>{icon}</InputAdornment>
          ),
        }}
        multiline
        rows={rows}
        fullWidth
      />
    </FormGroup>
  );
};
export default TextAreaInput;
