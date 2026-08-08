'use client';

import { X, Plus, Trash2 } from 'lucide-react';

export default function ProductFormModal({
  isOpen,
  isEdit,
  data,
  categories,
  onChange,
  onClose,
  onSubmit,
  onOpenCategoryModal,
  onFileChoose
}) {
  if (!isOpen) return null;

  const update = (patch) => onChange({ ...data, ...patch });

  const updateSpecRow = (index, field, value) => {
    const rows = [...(data.technicalSpecsRows || [])];
    rows[index] = { ...rows[index], [field]: value };
    update({ technicalSpecsRows: rows });
  };

  const addSpecRow = () => {
    update({ technicalSpecsRows: [...(data.technicalSpecsRows || []), { label: '', value: '' }] });
  };

  const removeSpecRow = (index) => {
    const rows = (data.technicalSpecsRows || []).filter((_, i) => i !== index);
    update({ technicalSpecsRows: rows.length ? rows : [{ label: '', value: '' }] });
  };

  const updateApplication = (index, field, value) => {
    const apps = [...(data.applications || [])];
    apps[index] = { ...apps[index], [field]: value };
    update({ applications: apps });
  };

  const addApplication = () => {
    update({ applications: [...(data.applications || []), { title: '', text: '' }] });
  };

  const removeApplication = (index) => {
    const apps = (data.applications || []).filter((_, i) => i !== index);
    update({ applications: apps.length ? apps : [{ title: '', text: '' }] });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-box" style={{ maxWidth: '780px', maxHeight: '92vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 2, paddingBottom: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E293B' }}>
            {isEdit ? 'Edit Product Details' : 'Add New Product'}
          </h3>
          <button type="button" onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Section title="Basic Information">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Field label="Product Code *">
                <input type="text" className="form-input" required value={data.code || ''} onChange={(e) => update({ code: e.target.value })} placeholder="e.g. D4" />
              </Field>
              <Field label="Select Category *">
                <select
                  className="form-input"
                  required
                  value={data.categoryName || ''}
                  onChange={(e) => {
                    const selVal = e.target.value;
                    const matched = categories.find((c) => c.name === selVal);
                    update({
                      categoryName: selVal,
                      category: matched ? matched.slug : selVal.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    });
                  }}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.id || c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={onOpenCategoryModal}
                  style={{ marginTop: '6px', background: 'none', border: 'none', color: '#F47B20', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}
                >
                  + Create New Category
                </button>
              </Field>
            </div>
            <Field label="Product Name *">
              <input type="text" className="form-input" required value={data.name || ''} onChange={(e) => update({ name: e.target.value })} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Field label="Display Price *">
                <input type="text" className="form-input" required value={data.priceFormatted || ''} onChange={(e) => update({ priceFormatted: e.target.value })} placeholder="₹ 36,80,000" />
              </Field>
              <Field label="Minimum Order Quantity">
                <input type="text" className="form-input" value={data.minOrderQty || ''} onChange={(e) => update({ minOrderQty: e.target.value })} />
              </Field>
            </div>
            <Field label="Short Description">
              <textarea className="form-textarea" rows={2} value={data.shortDescription || ''} onChange={(e) => update({ shortDescription: e.target.value })} placeholder="Brief summary for listings..." />
            </Field>
            <Field label="Product Image">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileChoose(e.target.files[0], (url) => update({ image: url }))}
                  style={{ padding: '8px', border: '1px solid #CBD5E1', borderRadius: '6px', backgroundColor: '#F8FAFC', flex: 1 }}
                />
                {data.image && (
                  <img src={data.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
                )}
              </div>
            </Field>
          </Section>

          <Section title="Technical Specifications">
            {(data.technicalSpecsRows || []).map((row, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                <input type="text" className="form-input" placeholder="Spec name (e.g. Voltage)" value={row.label} onChange={(e) => updateSpecRow(idx, 'label', e.target.value)} />
                <input type="text" className="form-input" placeholder="Value (e.g. 380V-50Hz-3P)" value={row.value} onChange={(e) => updateSpecRow(idx, 'value', e.target.value)} />
                <button type="button" onClick={() => removeSpecRow(idx)} style={{ background: '#FEE2E2', border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer', color: '#DC2626' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addSpecRow} className="btn btn-white btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Plus size={14} /> Add Specification
            </button>
          </Section>

          <Section title="Product Details">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Field label="Usage & Applications">
                <input type="text" className="form-input" value={data.usageApplications || ''} onChange={(e) => update({ usageApplications: e.target.value })} />
              </Field>
              <Field label="Operating Type">
                <input type="text" className="form-input" value={data.operatingType || ''} onChange={(e) => update({ operatingType: e.target.value })} />
              </Field>
              <Field label="Warranty">
                <input type="text" className="form-input" value={data.warranty || ''} onChange={(e) => update({ warranty: e.target.value })} />
              </Field>
              <Field label="Supply Ability">
                <input type="text" className="form-input" value={data.supplyAbility || ''} onChange={(e) => update({ supplyAbility: e.target.value })} />
              </Field>
              <Field label="Delivery Time">
                <input type="text" className="form-input" value={data.deliveryTime || ''} onChange={(e) => update({ deliveryTime: e.target.value })} />
              </Field>
            </div>
          </Section>

          <Section title="Description & Features">
            <Field label="Full Product Description *">
              <textarea className="form-textarea" rows={4} required value={data.description || ''} onChange={(e) => update({ description: e.target.value })} placeholder="Detailed product description..." />
            </Field>
            <Field label="Key Features (one per line)">
              <textarea className="form-textarea" rows={3} value={data.featuresText || ''} onChange={(e) => update({ featuresText: e.target.value })} placeholder="High-speed CNC servo system&#10;Integrated automatic wire feeding..." />
            </Field>
          </Section>

          <Section title="Applications">
            {(data.applications || []).map((app, idx) => (
              <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>Application #{idx + 1}</span>
                  <button type="button" onClick={() => removeApplication(idx)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <input type="text" className="form-input" placeholder="Title (e.g. High-rise Building Construction)" value={app.title} onChange={(e) => updateApplication(idx, 'title', e.target.value)} style={{ marginBottom: '8px' }} />
                <textarea className="form-textarea" rows={2} placeholder="Description..." value={app.text} onChange={(e) => updateApplication(idx, 'text', e.target.value)} />
              </div>
            ))}
            <button type="button" onClick={addApplication} className="btn btn-white btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Plus size={14} /> Add Application
            </button>
          </Section>

          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.isTopSelling} onChange={(e) => update({ isTopSelling: e.target.checked })} />
              Top Selling Product
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.isFeatured} onChange={(e) => update({ isFeatured: e.target.checked })} />
              Featured on Homepage
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF', paddingTop: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{isEdit ? 'Update Product' : 'Save Product'}</button>
            <button type="button" className="btn btn-white" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px' }}>
      <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F47B20', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}
