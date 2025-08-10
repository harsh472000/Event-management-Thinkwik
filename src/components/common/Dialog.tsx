import React from "react";
import "@/styles/dialog.css";
import CommonButton from "@/components/common/CommonButton";

interface DialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        {title && <h2 className="dialog-title">{title}</h2>}
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <CommonButton variant="ghost" onClick={onCancel}>
            Cancel
          </CommonButton>
          <CommonButton variant="danger" onClick={onConfirm}>
            Delete
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
