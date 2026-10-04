export interface ActionGetResponse {
  icon: string;
  title: string;
  description: string;
  label: string;
  disabled?: boolean;
  links?: {
    actions: {
      href: string;
      label: string;
      parameters?: {
        name: string;
        label?: string;
        required?: boolean;
      }[];
    }[];
  };
  errorMessage?: string;
}

export interface ActionPostResponse {
  transaction: string;
  message?: string;
}

export const ACTION_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  'Content-Type': 'application/json'
};
