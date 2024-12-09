export type PartnerType = 'SUBCONTRACTOR' | 'SUPPLIER' | 'CONSULTANT' | 'OTHER';

export interface Partner {
  id: string;
  name: string;
  siret: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  type: PartnerType;
}

export interface PartnerContract {
  id: string;
  reference: string;
  partnerId: string;
  projectId: string;
  startDate: string;
  endDate?: string;
  amount: number;
  scope?: string;
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'ACTIVE' | 'COMPLETED' | 'TERMINATED';
  contractDocumentId?: string;
}