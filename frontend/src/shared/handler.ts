import axios, { AxiosError } from 'axios';

interface IHandler {
  (handle: () => Promise<void>, customCatch: (err: AxiosError) => Promise<boolean>): Promise<void>;
}

const handler: IHandler = async (
  handle,
  customCatch = async () => {
    return false;
  }
) => {
  try {
    await handle();
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err) && err?.response && (await customCatch(err))) return;
    alert('Upss... Something went wrong');
  }
};

export default handler;
