import { Form, Popover, PopoverProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

function useDelayStatus(errors: React.ReactNode[]) {
  const [delayErrors, setDelayErrors] = useState(errors);

  useEffect(() => {
    if (errors.length) {
      setDelayErrors(errors);
    } else {
      const timeout = setTimeout(() => {
        setDelayErrors(errors);
      });

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errors]);

  return delayErrors;
}

interface PopoverValidatorProps extends Omit<PopoverProps, 'open' | 'content'> {
  content?: (errors: React.ReactNode[]) => React.ReactNode;
}

const PopoverValidator: React.FC<PopoverValidatorProps> = ({ content, ...props }) => {
  const { errors } = Form.Item.useStatus();
  const delayErrors = useDelayStatus(errors);

  return (
    <Popover
      {...props}
      content={
        content ? (
          content(delayErrors)
        ) : (
          <Typography.Text type="danger">{delayErrors[0]}</Typography.Text>
        )
      }
      open={delayErrors.length > 0}
    />
  );
};

export default PopoverValidator;
