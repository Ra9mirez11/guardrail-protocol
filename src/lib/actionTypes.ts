export type ActionType = 'action' | 'completed';

export interface ActionParameter {
  name: string;
  label?: string;
  required?: boolean;
}

export interface LinkedAction {
  label: string;
  href: string;
  parameters?: ActionParameter[];
}

export interface ActionGetResponse {
  type?: ActionType;
  icon: string;
  title: string;
  description: string;
  label: string;
  disabled?: boolean;
  links?: {
    actions: LinkedAction[];
  };
  error?: {
    message: string;
  };
}

export interface ActionPostRequest {
  account: string;
}

export interface ActionPostResponse {
  transaction: string;
  message?: string;
}

export interface ActionError {
  message: string;
}

export const ACTION_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  'Content-Type': 'application/json'
};
