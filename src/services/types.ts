export type TIngredient = {
  "_id": string;
  "name": string;
  "type": string;
  "proteins": number;
  "fat": number;
  "carbohydrates": number;
  "calories": number;
  "price": number;
  "image": string;
  "image_mobile": string;
  "image_large": string;
  "__v": number;
};

export type TOrder = {
  "name": string;
  "order": {
    "number": number
  };
  "success": boolean;
};


export type TWsOrder = {
  "ingredients": string[];
  "_id": string;
  "status": string;
  "number": number;
  "createdAt": string;
  "updatedAt": string;
  "name": string;
};

export type TOrdersPayload = {
  orders: TWsOrder[];
  total: number;
  totalToday: number;
};

export type TUserPayload = {
  name: string;
  email: string;
};

export type TOrderPayload = {
  ingredients: ReadonlyArray<TIngredient>;
};
