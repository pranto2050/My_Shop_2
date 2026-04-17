'use client'

import { useState, useMemo } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaBox, FaLayerGroup, FaPalette, FaCamera, FaPlus, FaImage, FaFileExport, FaPencil, FaTrash } from 'react-icons/fa6'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import StatCard from './StatCard'
import ConfirmDialog from '../UI/ConfirmDialog'
import styles from './DashboardPanel.module.css'

export default function DashboardPanel() {
  const { products, categories, designs, gallery, setPanel, dispatch } = useAdmin()
  const [deleteId, setDeleteId] = useState(null)

  // Prepare data for Pie Chart (Products per Category)
  const categoryData = useMemo(() => {
    const counts = {}
    products.forEach(p => {
      const cat = categories.find(c => c.id === p.category || c.name === p.category)
      const name = cat ? cat.name : p.category
      counts[name] = (counts[name] || 0) + 1
    })
    return Object.keys(counts).map(cat => ({
      name: cat,
      value: counts[cat]
    }))
  }, [products, categories])

  // Prepare data for Bar Chart (Stock status or Price distribution)
  const barData = useMemo(() => {
    return categories.map(cat => ({
      name: cat.name || cat,
      count: products.filter(p => p.category === (cat.id || cat.name || cat)).length
    }))
  }, [products, categories])

  const COLORS = ['#3B1F0C', '#D4882A', '#A0522D', '#6B8E23', '#8B4513', '#BC8F8F']

  const stats = [
    {
      id: 1,
      label: 'মোট পণ্য',
      number: products.length,
      icon: <FaBox />,
      color: 'var(--walnut)',
      bgTint: 'rgba(59, 31, 12, 0.1)',
      watermark: '📦',
      trend: '+৫ এই সপ্তাহে'
    },
    {
      id: 2,
      label: 'ক্যাটাগরি',
      number: categories.length,
      icon: <FaLayerGroup />,
      color: 'var(--honey)',
      bgTint: 'rgba(212, 136, 42, 0.1)',
      watermark: '🗂️',
      trend: 'সকল সক্রিয়'
    },
    {
      id: 3,
      label: 'ডিজাইন',
      number: designs.length,
      icon: <FaPalette />,
      color: 'var(--sienna)',
      bgTint: 'rgba(160, 82, 45, 0.1)',
      watermark: '🎨',
      trend: '+১২ নতুন'
    },
    {
      id: 4,
      label: 'গ্যালারি',
      number: gallery.length,
      icon: <FaCamera />,
      color: 'var(--moss)',
      bgTint: 'rgba(107, 142, 35, 0.1)',
      watermark: '📸',
      trend: '+৩ আপডেট'
    }
  ]

  const recentProducts = products.slice(0, 6)

  const handleEdit = (product) => {
    dispatch({ type: 'SET_EDITING_PRODUCT', payload: product })
    setPanel('add-product')
  }

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_PRODUCT', payload: deleteId })
    setDeleteId(null)
  }

  return (
    <div className={styles.dashboard}>
      <ConfirmDialog 
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        message="আপনি কি নিশ্চিত যে আপনি এই পণ্যটি মুছে ফেলতে চান?"
      />
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>ড্যাশবোর্ড</h1>
          <p className={styles.date}>{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className={styles.quickActions}>
        <button onClick={() => setPanel('add-product')} className={styles.actionBtn}>
          <FaPlus /> নতুন পণ্য
        </button>
        <button onClick={() => setPanel('designs')} className={styles.actionBtn}>
          <FaPalette /> নতুন ডিজাইন
        </button>
        <button onClick={() => setPanel('gallery')} className={styles.actionBtn}>
          <FaImage /> ছবি যোগ
        </button>
        <button onClick={() => setPanel('export')} className={styles.actionBtn}>
          <FaFileExport /> Export
        </button>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>ক্যাটাগরি ভিত্তিক পণ্য বিন্যাস</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>ক্যাটাগরি ভিত্তিক পণ্যের সংখ্যা</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'var(--bark-soft)', fontSize: 12}}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'var(--bark-soft)', fontSize: 12}}
                />
                <Tooltip 
                  cursor={{fill: 'var(--bg-tint)', opacity: 0.1}}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="var(--honey)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>সম্প্রতি যোগ করা পণ্য</h2>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <span>পণ্য</span>
            <span>ক্যাটাগরি</span>
            <span>মূল্য</span>
            <span>স্টক</span>
            <span>অ্যাকশন</span>
          </div>
          <div className={styles.rows}>
            {recentProducts.map(product => (
              <div key={product.id} className={styles.row}>
                <div className={styles.productInfo}>
                  <img src={product.image} alt={product.name} className={styles.thumb} />
                  <div>
                    <span className={styles.id}>{product.id}</span>
                    <h3 className={styles.name}>{product.name}</h3>
                  </div>
                </div>
                <div className={styles.category}>
                  <span className={styles.categoryPill}>{product.category}</span>
                </div>
                <div className={styles.price}>
                  ৳{product.price.toLocaleString('bn-BD')}
                </div>
                <div className={styles.stock}>
                  <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                    {product.inStock ? '✅ স্টকে আছে' : '❌ স্টক শেষ'}
                  </span>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(product)} className={styles.editBtn} title="সম্পাদনা">
                    <FaPencil />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn} title="মুছে ফেলুন">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
