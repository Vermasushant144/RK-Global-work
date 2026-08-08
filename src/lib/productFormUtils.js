const DEFAULT_IMAGE = '/images/img/Untitled design - 2026-02-02T154951.040.webp';

export const emptyProductForm = () => ({
  id: '',
  code: '',
  name: '',
  category: '',
  categoryName: '',
  priceFormatted: '₹ ',
  shortDescription: '',
  description: '',
  image: DEFAULT_IMAGE,
  usageApplications: 'Industrial',
  operatingType: 'Semi Automatic / Automatic',
  warranty: '24 Months OEM Warranty',
  minOrderQty: '1 Piece / Pieces',
  supplyAbility: '5 Piece Per Day',
  deliveryTime: '1 - 3 Days',
  technicalSpecsRows: [{ label: '', value: '' }],
  featuresText: '',
  applications: [{ title: '', text: '' }],
  isTopSelling: false,
  isFeatured: false
});

export const productToFormData = (product) => {
  if (!product) return emptyProductForm();

  const technicalSpecsRows = product.technicalSpecs
    ? Object.entries(product.technicalSpecs).map(([label, value]) => ({ label, value }))
    : [{ label: '', value: '' }];

  const applications = product.applicationsList?.length
    ? product.applicationsList.map((a) => ({ title: a.title || '', text: a.text || '' }))
    : [{ title: '', text: '' }];

  return {
    id: product.id || '',
    code: product.code || '',
    name: product.name || '',
    category: product.category || '',
    categoryName: product.categoryName || '',
    priceFormatted: product.priceFormatted || '₹ ',
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    image: product.image || DEFAULT_IMAGE,
    usageApplications: product.usageApplications || 'Industrial',
    operatingType: product.operatingType || 'Semi Automatic / Automatic',
    warranty: product.warranty || '24 Months OEM Warranty',
    minOrderQty: product.minOrderQty || '1 Piece / Pieces',
    supplyAbility: product.supplyAbility || '5 Piece Per Day',
    deliveryTime: product.deliveryTime || '1 - 3 Days',
    technicalSpecsRows: technicalSpecsRows.length ? technicalSpecsRows : [{ label: '', value: '' }],
    featuresText: (product.features || []).join('\n'),
    applications: applications.length ? applications : [{ title: '', text: '' }],
    isTopSelling: !!product.isTopSelling,
    isFeatured: !!product.isFeatured
  };
};

export const formDataToProduct = (form, isEdit) => {
  const technicalSpecs = {};
  (form.technicalSpecsRows || []).forEach(({ label, value }) => {
    if (label?.trim()) technicalSpecs[label.trim()] = value?.trim() || '';
  });

  const features = (form.featuresText || '')
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean);

  const applicationsList = (form.applications || [])
    .filter((a) => a.title?.trim() || a.text?.trim())
    .map((a) => ({ title: a.title.trim(), text: a.text.trim() }));

  const slugBase = (form.name || form.code || 'product')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const priceNum = parseInt(String(form.priceFormatted).replace(/[^\d]/g, ''), 10) || 0;

  const keySpecs = Object.entries(technicalSpecs)
    .slice(0, 4)
    .map(([label, value]) => ({ label, value }));

  return {
    id: isEdit && form.id ? form.id : slugBase || Date.now().toString(),
    code: form.code.trim(),
    name: form.name.trim(),
    category: form.category,
    categoryName: form.categoryName,
    priceFormatted: form.priceFormatted.trim(),
    priceNum,
    shortDescription: form.shortDescription.trim() || form.description.trim().slice(0, 160),
    description: form.description.trim(),
    image: form.image || DEFAULT_IMAGE,
    gallery: [form.image || DEFAULT_IMAGE],
    technicalSpecs,
    keySpecs: keySpecs.length ? keySpecs : [{ label: 'Product Type', value: form.name }],
    features,
    applicationsList,
    usageApplications: form.usageApplications,
    operatingType: form.operatingType,
    warranty: form.warranty,
    minOrderQty: form.minOrderQty,
    supplyAbility: form.supplyAbility,
    deliveryTime: form.deliveryTime,
    isTopSelling: form.isTopSelling,
    isFeatured: form.isFeatured
  };
};
