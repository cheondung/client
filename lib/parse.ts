export const parseProductImageSrc = (image: ProductImage) =>
  image.source === 'BUNJANG' ? `${process.env.NEXT_PUBLIC_BUNJANG_MEDIA_HOST}/${image.path}` : '';
