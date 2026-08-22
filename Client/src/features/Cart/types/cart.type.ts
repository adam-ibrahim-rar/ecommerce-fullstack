export interface CartItem {
  id: string;         // cart item id (للحذف والتعديل)
  productId: string;  // product id الحقيقي (لإنشاء الأوردر)
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  id: string;
  items: CartItem[];
}