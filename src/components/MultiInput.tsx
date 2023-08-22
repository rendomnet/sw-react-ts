import React, { useState } from "react";
import {
  TextField,
  Chip,
  IconButton,
  Box,
  InputAdornment,
  FormControl,
  FormLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

interface MultiInputFieldProps {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  label,
  values,
  onChange,
}) => {
  const [newValue, setNewValue] = useState<string>("");

  const handleAdd = () => {
    if (newValue.trim()) {
      onChange([...values, newValue.trim()]);
      setNewValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newArr = [...values];
    newArr.splice(index, 1);
    onChange(newArr);
  };

  return (
    <FormControl fullWidth margin="normal">
      <FormLabel>{label}</FormLabel>
      <Box mb={2}>
        {values.map((value, index) => (
          <Chip
            key={index}
            label={value}
            onDelete={() => handleRemove(index)}
            deleteIcon={<CloseIcon />}
            style={{ marginRight: "5px", marginBottom: "5px" }}
          />
        ))}
      </Box>
      <TextField
        placeholder={`Add a new ${label.toLowerCase()}`}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAdd} edge="end">
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default MultiInputField;
