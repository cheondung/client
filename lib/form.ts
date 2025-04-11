import { UseFormSetError } from 'react-hook-form';
import { HTTPError } from 'ky';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setErrors = async (error: HTTPError, setError: UseFormSetError<any>) => {
  const body = await error.response.json<ErrorBody>();
  if (body.fieldErrors) {
    Object.entries(body.fieldErrors).forEach(([key, value]) => {
      setError(key, { message: value });
    });
  }
};
