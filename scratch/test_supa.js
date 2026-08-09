const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ayczqldyvautvddysfkm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3pxbGR5dmF1dHZkZHlzZmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxOTMxNjQsImV4cCI6MjEwMTc2OTE2NH0.TFTfdeqINGJHNFWo9VjUvn1WQW4V2VHA8rno30KrRfE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing Supabase Connection with real Anon JWT Key...');
  
  // Test Blog Insert
  const { data: blogData, error: blogErr } = await supabase.from('blogs').upsert([{
    id: 'test-blog-' + Date.now(),
    title: 'Live Supabase Test Article',
    slug: 'live-supabase-test-article',
    category: 'Technical Guide',
    author: 'R.K. Global Admin',
    date: 'Aug 10, 2026',
    readTime: '3 min read',
    image: '/images/about-banner.png',
    excerpt: 'This is a test blog entry inserted to verify Supabase synchronization.',
    content: '<h2>Successful Supabase Connection</h2><p>Data persistence working live!</p>'
  }]);

  if (blogErr) {
    console.error('BLOG INSERT ERROR:', blogErr);
  } else {
    console.log('BLOG INSERT SUCCESS:', blogErr ? 'Failed' : 'SUCCESSFUL!');
  }

  // Test Product Insert
  const { data: prodData, error: prodErr } = await supabase.from('products').upsert([{
    id: 'test-prod-' + Date.now(),
    code: 'RK-TEST-01',
    name: 'Automatic Rebar Cutter Test Machine',
    categoryName: 'Rebar Processing',
    category: 'rebar-processing',
    priceFormatted: '₹ 1,85,000',
    priceNum: 185000,
    shortDescription: 'Test product entry inserted live.',
    description: 'Full description test product entry.',
    image: '/images/img/Untitled design - 2026-02-02T154951.040.webp',
    gallery: ['/images/img/Untitled design - 2026-02-02T154951.040.webp'],
    technicalSpecs: { "Cutting Capacity": "32 mm", "Motor Power": "5.5 kW" },
    keySpecs: [{ label: "Capacity", value: "32 mm" }],
    features: ["Heavy Duty Steel Blades", "1-Year Warranty"],
    minOrderQty: '1 Piece / Pieces',
    supplyAbility: '5 Piece Per Day',
    deliveryTime: '1 - 3 Days'
  }]);

  if (prodErr) {
    console.error('PRODUCT INSERT ERROR:', prodErr);
  } else {
    console.log('PRODUCT INSERT SUCCESS:', prodErr ? 'Failed' : 'SUCCESSFUL!');
  }
}

test();
