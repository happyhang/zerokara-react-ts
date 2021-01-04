import { FormikContextType } from 'formik';

export type ConnectedFormikProps<T = unknown> = { formik: FormikContextType<T> };
