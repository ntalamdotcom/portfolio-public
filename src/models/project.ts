export type ProjectStatus = 'completed' | 'pending' | 'failed';

export interface Project {
  id: string;
  status: ProjectStatus;
  projectDetails: string;
  projectStartingDate: number;
  projectID: string;
  projectName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
  created_at: string;
  updated_at: string;
}
