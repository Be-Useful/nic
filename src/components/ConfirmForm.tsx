"use client";

import React, { FormHTMLAttributes } from 'react';

interface ConfirmFormProps extends FormHTMLAttributes<HTMLFormElement> {
  action: any;
  confirmMessage: string;
}

export default function ConfirmForm({ action, confirmMessage, children, className, style }: ConfirmFormProps) {
  return (
    <form 
      action={action} 
      className={className}
      style={style}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </form>
  );
}
