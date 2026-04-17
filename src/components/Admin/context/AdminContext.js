'use client'

import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { categories as initialCategories } from '../../../../data/categories'
import { products as initialProducts } from '../../../../data/products'
import { gallery as initialGallery } from '../../../../data/gallery'
import { designs as initialDesigns } from '../../../../data/designs'

const AdminContext = createContext();

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  activePanel: 'dashboard',
  products: initialProducts,
  categories: initialCategories,
  gallery: initialGallery,
  designs: initialDesigns,
  editingProduct: null,
  editingDesign: null,
  editingGallery: null,
  searchQuery: '',
  filterCategory: 'all',
  filterStatus: 'all',
  sortBy: 'newest',
  currentPage: 1,
  itemsPerPage: 20,
  sidebarOpen: false,
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN':
      return { ...state, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, isLoading: false };
    case 'SET_PANEL':
      return { ...state, activePanel: action.payload, editingProduct: null, editingDesign: null, editingGallery: null };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTER':
      return { ...state, filterCategory: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };
    
    // Product Actions
    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'SET_EDITING_PRODUCT':
      return { ...state, editingProduct: action.payload };

    // Category Actions
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(c => c.id === action.payload.id ? action.payload : c)
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload)
      };

    // Gallery Actions
    case 'ADD_GALLERY':
      return { ...state, gallery: [action.payload, ...state.gallery] };
    case 'DELETE_GALLERY':
      return {
        ...state,
        gallery: state.gallery.filter(g => g.id !== action.payload)
      };

    // Design Actions
    case 'ADD_DESIGN':
      return { ...state, designs: [action.payload, ...state.designs] };
    case 'UPDATE_DESIGN':
      return {
        ...state,
        designs: state.designs.map(d => d.id === action.payload.id ? action.payload : d)
      };
    case 'DELETE_DESIGN':
      return {
        ...state,
        designs: state.designs.filter(d => d.id !== action.payload)
      };
    case 'SET_EDITING_DESIGN':
      return { ...state, editingDesign: action.payload };

    default:
      return state;
  }
}

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    const authStatus = localStorage.getItem('ma_furniture_admin_auth');
    if (authStatus === 'true') {
      dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (password) => {
    if (password === 'mafurniture2024') {
      localStorage.setItem('ma_furniture_admin_auth', 'true');
      dispatch({ type: 'LOGIN' });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('ma_furniture_admin_auth');
    dispatch({ type: 'LOGOUT' });
  };

  const setPanel = (panel) => dispatch({ type: 'SET_PANEL', payload: panel });
  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });

  return (
    <AdminContext.Provider value={{ 
      ...state, 
      dispatch, 
      login, 
      logout, 
      setPanel, 
      toggleSidebar, 
      closeSidebar 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
