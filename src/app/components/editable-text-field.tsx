import Image from "next/image";
import { useState, useEffect } from "react";
import EditIcon from "@/app/assets/mingcute_edit-line.svg";

export default function EditableTextField({
  value,
  placeholder,
  onUpdate,
  fieldType = "text",
  className = "",
  inputClassName = "",
}: {
  value: string | number;
  placeholder: string;
  onUpdate: (value: string | number) => void;
  fieldType?: "text" | "price";
  className?: string;
  inputClassName?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const formattedDisplay = () => {
    if (!value) return placeholder;
    if (fieldType === "price") {
      return `R$ ${(Number(value) / 100).toFixed(2).replace(".", ",")}`;
    }
    return String(value);
  };

  useEffect(() => {
    if (isEditing) {
      if (fieldType === "price" && !value) {
        setInputValue("");
      } else {
        setInputValue(String(value));
      }
    }
  }, [isEditing, value, fieldType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      finishEditing();
    }
  };

  const finishEditing = () => {
    setIsEditing(false);
    if (fieldType === "price") {
      const cleaned = inputValue.replace(/\D/g, "");
      onUpdate(cleaned ? parseInt(cleaned, 10) : 0);
    } else {
      onUpdate(inputValue);
    }
  };

  const defaultClassName =
    "w-full flex items-center hover:text-[#F54B00] transition-colors";
  const defaultInputClassName =
    "w-full mr-1 bg-transparent border-b border-[#FF9633] outline-none";

  return (
    <div className="flex items-center mb-1">
      {isEditing ? (
        <input
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={finishEditing}
          onKeyDown={handleKeyDown}
          autoFocus
          className={`${defaultInputClassName} ${inputClassName}`}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className={`${defaultClassName} ${className}`}
        >
          <div className="mr-1 truncate">{formattedDisplay()}</div>
          <Image src={EditIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
}
