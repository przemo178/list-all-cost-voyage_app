export interface CostsData {
  daCurrency: {
    currency: string;
  };
  baseCurrency: {
    currency: string;
    exchangeRate: number;
  };
  costs: [
    {
      id: number;
      name: string;
      displayOrder: number;
      costItems: [
        {
          id: number;
          name: string;
          costItemAlias: {
            accountingCode: string;
          };
          annotation: {
            id: number;
            name: string;
          };
          costs: [
            {
              daStage: string;
              persona: string;
              type: string;
              amount: number;
            },
            {
              daStage: string;
              persona: string;
              type: string;
              amount: number;
            }
          ];
          comments: [
            {
              id: number;
              daStage: string;
              persona: string;
              author: string;
              comment: string;
              type: string;
              date: string;
            }
          ];
        },
        {
          id: number;
          name: string;
          costItemAlias: {
            accountingCode: string;
          };
          annotation: {
            id: number;
            name: string;
          };
          costs: [
            {
              daStage: string;
              persona: string;
              type: string;
              amount: number;
            },
            {
              daStage: string;
              persona: string;
              type: string;
              amount: number;
            }
          ];
          comments: [
            {
              id: number;
              daStage: string;
              persona: string;
              author: string;
              comment: string;
              type: string;
              date: string;
            }
          ];
        }
      ];
    }
  ];
}
