/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, ReactNode, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Activity, Sparkles, Lock, Users, Award, Shield, Package, Target, TrendingUp, CheckCircle, MapPin, ArrowUpRight, Download, X, FileText, BarChart2, MessageSquare, Mail, Info, ArrowLeft, Loader2, Search, RefreshCw, Bell, ChevronRight, Zap, LogOut, Menu, Radio, AlertCircle, Clock, Calendar, Building2, Phone, ShoppingCart, Star, StarHalf, Send, Globe, FileCheck, Briefcase, Truck } from 'lucide-react';

const DESIGN_TOKENS = {
  colors: {
    navyDeep: '#00163A', // N2
    navyMain: '#002147', // N
    navyMedium: '#012D5A', // N3
    goldMatte: '#C5A059', // G
    goldLight: '#E8D09A', // GL
    goldDark: '#9A7A3A', // GD
    white: '#FFFFFF',
    error: '#991B1B',
    success: '#1A7A4A'
  },
  shadows: {
    card: '0 4px 24px rgba(0,33,71,0.10)',
    glow: '0 0 30px rgba(197,160,89,0.25)'
  },
  radius: {
    card: '16px'
  }
};

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --gold: #C5A059;
  --navy: #002147;
  --navy-deep: #00163A;
  --radius-card: 16px;
  --shadow-card: 0 4px 24px rgba(0,33,71,0.10);
  --shadow-glow: 0 0 30px rgba(197,160,89,0.25);
}

body {
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  background-color: var(--navy-deep);
  color: #FFFFFF;
  margin: 0;
  padding: 0;
}

/* Scrollbars */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: #001030;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #C5A059, #9A7A3A);
  border-radius: 4px;
}

/* Animaciones Base (Preservadas) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInR {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Nuevas Animaciones Requeridas */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes borderGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(197, 160, 89, 0.2); }
  50% { box-shadow: 0 0 30px rgba(197, 160, 89, 0.6); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes scan {
  0% { top: -10%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 110%; opacity: 0; }
}

/* Clases Utilitarias Nuevas */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,33,71,0.15);
}

.gold-shimmer {
  background: linear-gradient(90deg, var(--navy) 25%, rgba(197,160,89,0.15) 50%, var(--navy) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(197, 160, 89, 0.2);
  border-radius: var(--radius-card);
}

.scan-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gold);
  box-shadow: 0 0 10px var(--gold), 0 0 20px var(--gold);
  animation: scan 3s infinite linear;
  z-index: 10;
  pointer-events: none;
}

.countUp {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}

/* Clases de Animación para usar en className */
.animate-fade-up { animation: fadeUp 0.6s ease-out forwards; }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
.animate-slide-in-r { animation: slideInR 0.5s ease-out forwards; }
.animate-float { animation: float 3s infinite ease-in-out; }
.animate-border-glow { animation: borderGlow 2s infinite ease-in-out; }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-gradient-shift {
  background: linear-gradient(270deg, var(--navy-deep), #012D5A);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

/* Nuevas clases para Hero */
.feature-pill {
  border: 1px solid rgba(197,160,89,0.3);
  background-color: rgba(197,160,89,0.08);
  transition: all 0.3s ease;
}
.feature-pill:hover {
  background-color: rgba(197,160,89,0.2);
}
.btn-primary {
  background: linear-gradient(135deg, var(--gold), #9A7A3A);
  box-shadow: 0 0 20px rgba(197,160,89,0.3);
  transition: all 0.3s ease;
}
.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 0 30px rgba(197,160,89,0.6);
}
.btn-secondary {
  border: 1px solid rgba(197,160,89,0.4);
  background-color: transparent;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  background-color: rgba(197,160,89,0.1);
}
.bg-grid-pattern {
  background-image: linear-gradient(rgba(197,160,89,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(197,160,89,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
.text-glow-gold {
  text-shadow: 0 0 20px rgba(197,160,89,0.5);
}
@keyframes pulseGold {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

/* Casos de Éxito Grid & Card */
.case-card {
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E5E7EB;
  padding: 24px;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.case-card:hover {
  border-color: rgba(197,160,89,0.4);
  box-shadow: 0 8px 32px rgba(0,33,71,0.12);
  transform: translateY(-4px);
}
.cases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 1024px) {
  .cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .hidden-mobile {
    display: none !important;
  }
}
@media (min-width: 769px) {
  .hidden-desktop {
    display: none !important;
  }
}

/* Transparencia Cards */
.trans-card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}
.trans-card:hover {
  background-color: rgba(197,160,89,0.04);
  border-color: rgba(197,160,89,0.3);
}
.trans-icon-wrapper {
  width: 48px;
  height: 48px;
  background-color: #002147;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s ease;
}
.trans-card:hover .trans-icon-wrapper {
  box-shadow: 0 0 15px rgba(197,160,89,0.5);
}
.trans-arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  color: #C5A059;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translate(-4px, 4px);
}
.trans-card:hover .trans-arrow {
  opacity: 1;
  transform: translate(0, 0);
}
.legal-badge {
  color: rgba(255,255,255,0.6);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.nav-link {
  position: relative;
  text-decoration: none;
  display: inline-block;
}
.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--gold);
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
.responsive-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) {
  .responsive-grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .responsive-grid-3 {
    grid-template-columns: 1fr;
  }
}

/* NUEVAS ANIMACIONES v2.1 */
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes blinkCursor {
  0%, 100% { border-right-color: transparent; }
  50% { border-right-color: #C5A059; }
}
@keyframes blinkOpacity {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
.typewriter-text {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #C5A059;
  animation: typewriter 2.8s steps(40,end) 1.2s both,
             blinkCursor 0.75s step-end infinite;
  display: inline-block;
  max-width: 100%;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 28s linear infinite;
  display: flex;
  width: max-content;
}
.marquee-track:hover { animation-play-state: paused; }

.stat-number {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
  transition: all 0.1s ease;
}

@keyframes hexPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.04); }
}
.hex-active { animation: hexPulse 2.5s ease-in-out infinite; }

@keyframes imgZoom {
  from { transform: scale(1); }
  to   { transform: scale(1.06); }
}
.img-zoom:hover img { animation: imgZoom 0.4s ease forwards; }

.reveal-hidden {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.65s cubic-bezier(.22,1,.36,1),
              transform 0.65s cubic-bezier(.22,1,.36,1);
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
`;

const SectionCTA = ({ texto, btnLabel, btnColor="gold", onClick, marginTop="32px", padding="32px 0 0", borderTop="1px solid rgba(0,33,71,0.08)" }: any) => {
  return (
    <div style={{ padding, borderTop, marginTop, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
      <span style={{ fontSize: "15px", color: "#6B7280", fontWeight: 600 }}>{texto}</span>
      <button 
        onClick={onClick}
        style={{
          padding: "10px 24px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: btnColor === "gold" ? 800 : 700,
          cursor: "pointer",
          transition: "all 0.2s",
          background: btnColor === "gold" ? "#C5A059" : btnColor === "navy" ? "#002147" : "transparent",
          color: btnColor === "gold" ? "#00163A" : btnColor === "navy" ? "#FFFFFF" : "#002147",
          border: btnColor === "navy" ? "1px solid rgba(197,160,89,0.3)" : btnColor === "outline" ? "1px solid #002147" : "none",
        }}
        onMouseEnter={(e) => {
          if (btnColor === "outline") e.currentTarget.style.backgroundColor = "rgba(0,33,71,0.05)";
          else e.currentTarget.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          if (btnColor === "outline") e.currentTarget.style.backgroundColor = "transparent";
          else e.currentTarget.style.opacity = "1";
        }}
      >
        {btnLabel}
      </button>
    </div>
  )
};

export const EmptyState = ({ onClear, icon: Icon = Search }: { onClear: () => void, icon?: React.ElementType }) => (
  <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', gap: '16px' }}>
    <div style={{ color: '#CBD2DC' }}>
      <Icon size={48} />
    </div>
    <span style={{ fontSize: '14px', fontWeight: 600, color: '#8A95A3' }}>Sin resultados para este filtro</span>
    <button onClick={onClear} style={{ marginTop: '8px', padding: '8px 16px', borderRadius: '8px', backgroundColor: '#C5A059', color: '#00163A', border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '13px' }}>
      Limpiar filtros
    </button>
  </div>
);

// 1. GoldLine
export const GoldLine = () => (
  <div style={{ width: '100%', height: '1.5px', backgroundColor: 'rgba(197, 160, 89, 0.2)', position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
    <style>{`
      @keyframes slideDot {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
    `}</style>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '25%',
      background: 'linear-gradient(90deg, transparent, #C5A059, #E8D09A, #C5A059, transparent)',
      animation: 'slideDot 2s infinite ease-in-out'
    }} />
  </div>
);

// 2. Pill
interface PillProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'pulse' | 'violet';
}

export const Pill = ({ children, variant = 'default' }: PillProps) => {
  const getStyles = () => {
    switch (variant) {
      case 'success': return { bg: '#D1FAE5', fg: '#1A7A4A', bd: '#A7F3D0', dot: '#1A7A4A' };
      case 'warning': return { bg: '#FEF3C7', fg: '#9A7A3A', bd: '#FDE68A', dot: '#9A7A3A' };
      case 'error': return { bg: '#FEE2E2', fg: '#991B1B', bd: '#FECACA', dot: '#991B1B' };
      case 'info': return { bg: '#DBEAFE', fg: '#012D5A', bd: '#BFDBFE', dot: '#012D5A' };
      case 'violet': return { bg: '#EDE9FE', fg: '#5B21B6', bd: '#C4B5FD', dot: '#5B21B6' };
      case 'pulse': return { bg: 'rgba(197, 160, 89, 0.1)', fg: '#002147', bd: 'rgba(197, 160, 89, 0.3)', dot: '#C5A059' };
      default: return { bg: '#F3F4F6', fg: '#00163A', bd: '#E5E7EB', dot: '#00163A' };
    }
  };
  
  const { bg, fg, bd, dot } = getStyles();

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: bg,
      color: fg,
      border: `1px solid ${bd}`
    }}>
      {variant === 'pulse' && (
        <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
          <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: dot, opacity: 0.75 }}></span>
          <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '8px', width: '8px', backgroundColor: dot }}></span>
          <style>{`
            @keyframes ping {
              75%, 100% { transform: scale(2); opacity: 0; }
            }
          `}</style>
        </span>
      )}
      {children}
    </span>
  );
};

// 3. Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  gradient?: boolean;
  accentTop?: string;
  style?: React.CSSProperties;
  className?: string;
  key?: React.Key;
  onClick?: () => void;
}

export const Card = ({ children, hover, gradient, accentTop, style = {}, className = '', ...rest }: CardProps) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,33,71,0.10)',
    padding: '28px',
    position: 'relative',
    ...style
  };

  if (gradient) {
    baseStyle.background = 'linear-gradient(145deg, #FFFFFF 0%, #F7F6FF 100%)';
  }
  if (accentTop) {
    baseStyle.borderTop = `3px solid ${accentTop}`;
    baseStyle.borderTopLeftRadius = '16px';
    baseStyle.borderTopRightRadius = '16px';
  }

  const classes = `card ${hover ? 'hover-lift' : ''} ${className}`.trim();

  return (
    <div className={classes} style={baseStyle} {...rest}>
      {children}
    </div>
  );
};

// 4. MetricCard
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string | number;
  sub?: string;
  accentColor?: string;
  sparkData?: { v: number }[];
  dark?: boolean;
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  sub,
  accentColor = '#C5A059',
  sparkData,
  dark = false
}: MetricCardProps) => {
  const defaultSpark = [{v: 5}, {v: 12}, {v: 8}, {v: 15}, {v: 10}];
  const data = sparkData || defaultSpark;
  const isPositive = String(trend).startsWith('+');
  const trendColor = isPositive ? '#1A7A4A' : '#991B1B';

  return (
    <div className="animate-fade-up" style={{
      background: dark ? 'linear-gradient(180deg, #00163A 0%, #002147 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,33,71,0.06)',
      border: dark ? '1px solid rgba(197,160,89,0.2)' : '1px solid rgba(0,33,71,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ color: dark ? '#9CA3AF' : '#6B7280', fontSize: '14px', fontWeight: 500 }}>{title}</span>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${accentColor}33 0%, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor
        }}>
          <Icon size={20} />
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div className="countUp" style={{ fontSize: '32px', fontWeight: 800, color: dark ? '#FFFFFF' : '#00163A', lineHeight: 1 }}>
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: '13px', fontWeight: 600, color: dark ? '#9CA3AF' : '#6B7280', marginTop: '8px' }}>
              {sub}
            </div>
          )}
          {trend && !sub && (
            <div style={{ fontSize: '13px', fontWeight: 600, color: trendColor, marginTop: '8px' }}>
              {trend} vs mes anterior
            </div>
          )}
        </div>
        
        {(trend || sparkData) && (
          <div style={{ width: '80px', height: '40px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line 
                  type="monotone" 
                  dataKey="v" 
                  stroke={trend ? trendColor : accentColor} 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. SecTitle
interface SecTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const SecTitle = ({ title, subtitle, action }: SecTitleProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '4px', height: '20px', backgroundColor: '#C5A059', borderRadius: '2px' }} />
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#00163A', lineHeight: 1 }}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p style={{ margin: 0, fontSize: '14px', color: '#6B7280', lineHeight: 1.6, paddingLeft: '16px' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

const casos = [
  { title:"Programa Familias Fuertes", loc:"Tunja, Boyacá", year:"2024", 
    metric:"2.400 familias", kpi:"94% cobertura", color:"#C5A059",
    icon: Users, cat:"Cohesión Social", value:"$890M" },
  { title:"Escuelas de Padres", loc:"8 Municipios", year:"2024", 
    metric:"$560M adjudicados", kpi:"Contrato vigente", color:"#4A90D9",
    icon: Award, cat:"Educación", value:"$560M" },
  { title:"Atención Psicosocial ICBF", loc:"Duitama", year:"2023", 
    metric:"1.800 usuarios", kpi:"Ley 1361 cumplida", color:"#1A7A4A",
    icon: Shield, cat:"Protección", value:"$420M" },
  { title:"Suministros Comisarías", loc:"Sogamoso", year:"2024", 
    metric:"23 comisarías", kpi:"Entrega 100%", color:"#7B5CF0",
    icon: Package, cat:"Logística B2G", value:"$310M" },
  { title:"Giro Boyacá — Convivencia", loc:"Provincias Norte", year:"2023", 
    metric:"$1.2B ejecutados", kpi:"SECOP verificado", color:"#C5A059",
    icon: Target, cat:"Convivencia", value:"$1.2B" },
  { title:"Formación para el Trabajo", loc:"Puerto Boyacá", year:"2023", 
    metric:"600 mujeres", kpi:"ODM local alineado", color:"#E05C2A",
    icon: TrendingUp, cat:"Género & Empleo", value:"$280M" },
];

const transSections = [
  { id: "estructura", title: "Estructura Orgánica", desc: "Organigrama y directorio de la fundación.", icon: Users },
  { id: "presupuesto", title: "Presupuesto", desc: "Ejecución presupuestal y estados financieros.", icon: BarChart2 },
  { id: "paa", title: "Plan Anual de Adquisiciones", desc: "Proyección de compras y contratación.", icon: Target },
  { id: "contratos", title: "Contratación", desc: "Historial de contratos en SECOP II.", icon: FileText },
  { id: "informes", title: "Informes de Gestión", desc: "Reportes anuales y auditorías.", icon: Package },
  { id: "pqrsd", title: "PQRSD", desc: "Peticiones, quejas, reclamos y denuncias.", icon: MessageSquare }
];

const useCountUp = (target: number, duration: number = 1800, startOnVisible: boolean = true, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnVisible || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(easeProgress * target);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, isVisible]);

  return { count: count.toFixed(decimals), ref };
};

const StatItem = ({ target, decimals = 0, prefix = '', suffix = '', label, hasBorder }: { target: number, decimals?: number, prefix?: string, suffix?: string, label: string, hasBorder: boolean }) => {
  const { count, ref } = useCountUp(target, 1800, true, decimals);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: hasBorder ? '1px solid rgba(197,160,89,0.2)' : 'none' }}>
      <span ref={ref} className="stat-number" style={{ color: '#E8D09A', fontSize: '28px', fontWeight: 900, lineHeight: 1, marginBottom: '4px' }}>
        {prefix}{count}{suffix}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, textAlign: 'center' }}>{label}</span>
    </div>
  );
};

const TypewriterSubtitle = ({ text, delay = 1000 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, hasStarted, text]);

  return (
    <p className="animate-fade-up" style={{ maxWidth: '560px', fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 24px 0', animationDelay: '0.4s', minHeight: '60px' }}>
      {displayedText}
      {isTyping && <span style={{ color: '#C5A059', animation: 'blinkOpacity 0.75s step-end infinite', marginLeft: '2px' }}>|</span>}
    </p>
  );
};

const LargeStatItem = ({ target, decimals = 0, prefix = '', suffix = '', label }: { target: number, decimals?: number, prefix?: string, suffix?: string, label: string }) => {
  const { count, ref } = useCountUp(target, 1800, true, decimals);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <span ref={ref} className="stat-number" style={{ color: '#C5A059', fontSize: '36px', fontWeight: 900, marginBottom: '8px' }}>
        {prefix}{count}{suffix}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</span>
    </div>
  );
};

const imagenPorCaso = (title: string) => {
  const mapa: Record<string, string> = {
    "Programa Familias Fuertes":    "https://picsum.photos/seed/familia-colombia/600/260",
    "Escuelas de Padres — Centro":  "https://picsum.photos/seed/escuela-ninos/600/260",
    "Atención Psicosocial ICBF":    "https://picsum.photos/seed/atencion-social/600/260",
    "Suministros Comisarías":       "https://picsum.photos/seed/suministros-gov/600/260",
    "Giro Boyacá — Convivencia":    "https://picsum.photos/seed/convivencia-col/600/260",
    "Formación para el Trabajo":    "https://picsum.photos/seed/formacion-mujer/600/260",
  };
  return mapa[title] || "https://picsum.photos/seed/social-colombia/600/260";
};

const eventos = [
  { 
    id:1, nombre:"Feria Campesina Moniquirá", municipio:"Moniquirá", 
    fecha:"Sep 2024", asistentes:"4.200", tipo:"Feria",
    artista:"Grupo Niche", color:"#C5A059", size:"large",
    img:"https://picsum.photos/seed/feria-campesina/800/500"
  },
  { 
    id:2, nombre:"Festival de la Boyacensidad", municipio:"Tunja", 
    fecha:"Jul 2024", asistentes:"12.500", tipo:"Festival",
    artista:"Binomio de Oro", color:"#4A90D9", size:"normal",
    img:"https://picsum.photos/seed/festival-tunja/600/400"
  },
  { 
    id:3, nombre:"Jornada Familias Fuertes", municipio:"Duitama", 
    fecha:"Mar 2024", asistentes:"1.800", tipo:"Jornada",
    artista:"—", color:"#1A7A4A", size:"normal",
    img:"https://picsum.photos/seed/jornada-social/600/400"
  },
  { 
    id:4, nombre:"Noche Cultural Chiquinquirá", municipio:"Chiquinquirá", 
    fecha:"Dic 2023", asistentes:"3.600", tipo:"Cultural",
    artista:"Carlos Vives (tributo)", color:"#7B5CF0", size:"normal",
    img:"https://picsum.photos/seed/noche-cultural/600/400"
  },
  { 
    id:5, nombre:"Giro Boyacá — Clausura", municipio:"Sogamoso", 
    fecha:"Ago 2024", asistentes:"8.900", tipo:"Festival",
    artista:"Systema Solar", color:"#E05C2A", size:"large",
    img:"https://picsum.photos/seed/giro-boyaca/800/500"
  },
  { 
    id:6, nombre:"Día de la Familia Cubará", municipio:"Cubará", 
    fecha:"May 2024", asistentes:"620", tipo:"Jornada",
    artista:"Artistas locales", color:"#C5A059", size:"normal",
    img:"https://picsum.photos/seed/familia-cubara/600/400"
  },
];

const artistasTicker = [
  { nombre: "Grupo Niche", tipo: "🎵" },
  { nombre: "Binomio de Oro", tipo: "🎵" },
  { nombre: "Carlos Vives (tributo)", tipo: "🎵" },
  { nombre: "Systema Solar", tipo: "🎵" },
  { nombre: "Herencia de Timbiquí", tipo: "🎵" },
  { nombre: "Gobernación de Boyacá", tipo: "🏛️" },
  { nombre: "Alcaldía de Tunja", tipo: "🏛️" },
  { nombre: "ICBF Boyacá", tipo: "🤝" },
  { nombre: "PNUD Colombia", tipo: "🌐" },
  { nombre: "SENA Regional Boyacá", tipo: "🎓" },
  { nombre: "Ministerio de Cultura", tipo: "🏛️" },
  { nombre: "Artistas Locales Boyacenses", tipo: "🎵" },
];

const EventosSection = ({ onCtaClick }: any) => {
  const [hoveredEvento, setHoveredEvento] = useState<number | null>(null);
  const { count: countEventos, ref: refEventos } = useCountUp(28);
  const { count: countAsistentes, ref: refAsistentes } = useCountUp(52000);
  const { count: countContratos, ref: refContratos } = useCountUp(100);

  return (
    <div className="reveal-hidden" style={{ background: '#FFFFFF', padding: '64px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(197,160,89,0.1)', padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px' }}>
            <Calendar size={16} color="#C5A059" />
            <span style={{ color: '#C5A059', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>PORTAFOLIO DE EVENTOS · 2023–2025</span>
          </div>
          <h2 style={{ color: '#002147', fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
            Eventos que Transforman Boyacá
          </h2>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Ferias, festivales, jornadas comunitarias y producción audiovisual ejecutados en las 13 provincias del departamento.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px',
          marginBottom: '48px'
        }}>
          {eventos.map(e => (
            <div 
              key={e.id}
              onMouseEnter={() => setHoveredEvento(e.id)}
              onMouseLeave={() => setHoveredEvento(null)}
              style={{
                gridColumn: e.size === 'large' ? 'span 2' : 'span 1',
                height: e.size === 'large' ? '380px' : '280px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                cursor: 'pointer',
                border: '1px solid rgba(197,160,89,0.2)'
              }}
            >
              {/* CAPA 1 — Imagen de fondo */}
              <img 
                src={e.img} 
                alt={e.nombre}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hoveredEvento === e.id ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.5s ease'
                }}
                referrerPolicy="no-referrer"
              />

              {/* CAPA 2 — Overlay degradado */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: hoveredEvento === e.id 
                  ? 'linear-gradient(to top, rgba(0,21,58,0.75) 0%, rgba(0,21,58,0.4) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,21,58,0.92) 0%, rgba(0,21,58,0.4) 50%, transparent 100%)',
                transition: 'background 0.5s ease'
              }} />

              {/* CAPA 3 — Contenido */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ 
                    background: e.color, 
                    color: '#FFFFFF', 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 700 
                  }}>
                    {e.tipo}
                  </span>
                </div>
                
                <h3 style={{ 
                  color: '#FFFFFF', 
                  fontWeight: 800, 
                  fontSize: e.size === 'large' ? '20px' : '16px',
                  margin: 0,
                  lineHeight: 1.3
                }}>
                  {e.nombre}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#D1D5DB', fontSize: '11px', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#9CA3AF" />
                    {e.municipio}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} color="#9CA3AF" />
                    {e.fecha}
                  </div>
                </div>
                
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontSize: '13px', fontWeight: 700 }}>
                    <Users size={12} color="#FFFFFF" />
                    {e.asistentes}
                  </div>
                  {e.artista !== "—" && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C5A059', fontSize: '12px', fontWeight: 600 }}>
                      <Star size={12} color="#C5A059" />
                      {e.artista}
                    </div>
                  )}
                </div>
              </div>

              {/* CAPA 4 — Badge hover */}
              <div style={{
                position: 'absolute',
                top: 14,
                right: 14,
                opacity: hoveredEvento === e.id ? 1 : 0,
                transition: 'opacity 0.2s',
                background: '#C5A059',
                color: '#002147',
                borderRadius: '20px',
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 800
              }}>
                Ver detalles →
              </div>
            </div>
          ))}
        </div>

        {/* ARTISTA TICKER */}
        <div style={{
          background: '#EEF0F5',
          padding: '18px 0',
          overflow: 'hidden',
          borderTop: '1px solid #D1D5DB',
          borderBottom: '1px solid #D1D5DB',
          margin: '40px 0',
          position: 'relative'
        }}>
          {/* Etiqueta lateral izquierda */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            background: 'linear-gradient(90deg, #EEF0F5 60%, transparent)',
            zIndex: 2,
            color: '#6B7280',
            fontSize: '11px',
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}>
            Han confiado en nuestra ejecución:
          </div>
          
          {/* Gradiente lateral derecho */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '100px',
            background: 'linear-gradient(90deg, #EEF0F5 60%, transparent)',
            transform: 'scaleX(-1)',
            zIndex: 2,
            pointerEvents: 'none'
          }} />

          {/* Pista del ticker */}
          <div className="marquee-track" style={{ zIndex: 1, position: 'relative', width: 'max-content', paddingLeft: '180px' }}>
            {[...artistasTicker, ...artistasTicker].map((item, idx) => (
              <div key={idx} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 32px',
                cursor: 'default',
                color: '#6B7280',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#002147'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
              >
                <span style={{ fontSize: '14px' }}>{item.tipo}</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.nombre}</span>
                <span style={{ color: '#C5A059', margin: '0 4px' }}>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTADOR DE CIERRE DE SECCIÓN */}
        <div style={{ 
          background: '#002147', 
          padding: '20px 32px', 
          borderRadius: '16px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '48px',
          flexWrap: 'wrap',
          marginTop: '28px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C5A059', fontSize: '32px', fontWeight: 900, marginBottom: '4px' }}>
              +<span ref={refEventos}>{countEventos}</span>
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>Eventos ejecutados</div>
          </div>
          
          <div style={{ width: '1px', height: '40px', background: 'rgba(197,160,89,0.3)' }} />
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C5A059', fontSize: '32px', fontWeight: 900, marginBottom: '4px' }}>
              +<span ref={refAsistentes}>{countAsistentes.toLocaleString('es-CO')}</span>
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>Asistentes impactados</div>
          </div>
          
          <div style={{ width: '1px', height: '40px', background: 'rgba(197,160,89,0.3)' }} />
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C5A059', fontSize: '32px', fontWeight: 900, marginBottom: '4px' }}>
              <span ref={refContratos}>{countContratos}</span>%
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>Contratos cumplidos</div>
          </div>
        </div>

        <SectionCTA 
          texto="¿Quiere una feria o festival así en su municipio?"
          btnLabel="Solicitar producción de evento →"
          btnColor="gold"
          onClick={onCtaClick}
        />
      </div>
    </div>
  );
};

const provincias = [
  { nombre:"Centro",        municipios:6,  contratos:12, activa:true,  destacada:true  },
  { nombre:"Occidente",     municipios:8,  contratos:7,  activa:true,  destacada:false },
  { nombre:"Neira",         municipios:9,  contratos:5,  activa:true,  destacada:false },
  { nombre:"Norte",         municipios:9,  contratos:8,  activa:true,  destacada:true  },
  { nombre:"Tundama",       municipios:7,  contratos:9,  activa:true,  destacada:false },
  { nombre:"Sugamuxi",      municipios:10, contratos:11, activa:true,  destacada:true  },
  { nombre:"Márquez",       municipios:10, contratos:4,  activa:true,  destacada:false },
  { nombre:"Ricaurte",      municipios:10, contratos:3,  activa:false, destacada:false },
  { nombre:"Lengupá",       municipios:5,  contratos:2,  activa:true,  destacada:false },
  { nombre:"La Libertad",   municipios:4,  contratos:0,  activa:false, destacada:false },
  { nombre:"Oriente",       municipios:5,  contratos:3,  activa:true,  destacada:false },
  { nombre:"Valderrama",    municipios:8,  contratos:4,  activa:true,  destacada:false },
  { nombre:"Puerto Boyacá", municipios:1,  contratos:5,  activa:true,  destacada:true  },
];

const CoberturaSection = ({ onCtaClick }: any) => {
  const [tooltip, setTooltip] = useState<{visible: boolean, x: number, y: number, provincia: any}>({ visible: false, x: 0, y: 0, provincia: null });

  return (
    <div className="reveal-hidden" style={{ background: 'linear-gradient(180deg, #F7F8FA 0%, #FFFFFF 100%)', padding: '80px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(197,160,89,0.1)', padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px' }}>
            <MapPin size={16} color="#C5A059" />
            <span style={{ color: '#C5A059', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>PRESENCIA TERRITORIAL · BOYACÁ</span>
          </div>
          <h2 style={{ color: '#002147', fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
            13 Provincias, Una Sola Misión
          </h2>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Presencia activa con contratos ejecutados en 11 de las 13 provincias del departamento. Cobertura rural, urbana y étnica.
          </p>
        </div>

        {/* Layout: Dos Columnas */}
        <div style={{ display: 'flex', gap: '64px', alignItems: 'center', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
          
          {/* Columna Izquierda: Grid Hexagonal */}
          <div style={{ flex: '0 1 45%', minWidth: '320px', position: 'relative' }}>
            {tooltip.visible && tooltip.provincia && (
              <div style={{ 
                position: 'absolute', 
                left: tooltip.x, 
                top: tooltip.y - 12, 
                transform: 'translate(-50%, -100%)',
                background: '#002147', 
                color: '#E8D09A', 
                padding: '8px 14px', 
                borderRadius: '8px', 
                fontSize: '12px',
                zIndex: 50,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
              }}>
                Provincia {tooltip.provincia.nombre} · {tooltip.provincia.municipios} municipios · {tooltip.provincia.contratos} contratos
              </div>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {provincias.map((prov) => {
                const isGold = prov.activa && prov.contratos > 0;
                const isS2 = prov.activa && prov.contratos === 0;
                const bg = isGold ? '#C5A059' : isS2 ? '#EEF0F5' : 'rgba(0,21,58,0.08)';
                const color = isGold ? '#002147' : '#9CA3AF';
                const className = prov.destacada ? "hex-active" : "";
                
                return (
                  <div 
                    key={prov.nombre}
                    className={className}
                    onMouseEnter={(e) => {
                       const rect = e.currentTarget.getBoundingClientRect();
                       const parentRect = e.currentTarget.parentElement?.getBoundingClientRect() || rect;
                       setTooltip({
                         visible: true,
                         x: rect.left - parentRect.left + (rect.width / 2),
                         y: rect.top - parentRect.top,
                         provincia: prov
                       });
                    }}
                    onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}
                    style={{
                      width: '110px',
                      height: '120px',
                      margin: 'auto',
                      background: bg,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: color,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '0 4px', lineHeight: 1.1 }}>{prov.nombre}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, marginTop: '4px' }}>{prov.contratos} ctros</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Columna Derecha: Stats y Datos Clave */}
          <div style={{ flex: '0 1 45%', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#002147', color: '#C5A059', padding: '24px', borderRadius: '16px', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(0,33,71,0.1)' }}>
               <CheckCircle size={24} color="#C5A059" style={{ flexShrink: 0 }} />
               11 / 13 Provincias con contratos activos
            </div>
            <div style={{ background: '#F3F4F6', color: '#002147', padding: '24px', borderRadius: '16px', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <MapPin size={24} color="#002147" style={{ flexShrink: 0 }} />
               47 Municipios con presencia directa
            </div>
            <div style={{ background: '#F3F4F6', color: '#002147', padding: '24px', borderRadius: '16px', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <Target size={24} color="#002147" style={{ flexShrink: 0 }} />
               100% cobertura en Sugamuxi, Centro y Norte
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '8px' }}>
               <div style={{ display: 'flex', gap: '12px', color: '#6B7280', fontSize: '14px', alignItems: 'center', fontWeight: 500 }}>
                  <span style={{ background: 'rgba(26,122,74,0.1)', color: '#1A7A4A', padding: '2px', borderRadius: '50%', display: 'flex', flexShrink: 0 }}><CheckCircle size={14} /></span>
                  Única fundación con presencia en Cubará (zona étnica)
               </div>
               <div style={{ display: 'flex', gap: '12px', color: '#6B7280', fontSize: '14px', alignItems: 'center', fontWeight: 500 }}>
                  <span style={{ background: 'rgba(26,122,74,0.1)', color: '#1A7A4A', padding: '2px', borderRadius: '50%', display: 'flex', flexShrink: 0 }}><CheckCircle size={14} /></span>
                  Cobertura continua en Puerto Boyacá (zona especial)
               </div>
               <div style={{ display: 'flex', gap: '12px', color: '#6B7280', fontSize: '14px', alignItems: 'center', fontWeight: 500 }}>
                  <span style={{ background: 'rgba(26,122,74,0.1)', color: '#1A7A4A', padding: '2px', borderRadius: '50%', display: 'flex', flexShrink: 0 }}><CheckCircle size={14} /></span>
                  Contratos en todas las capitales de provincia
               </div>
            </div>
          </div>

        </div>

        {/* CTA Contextual */}
        <div style={{ marginTop: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#00163A' }}>
            ¿Su municipio no está en la lista? Queremos llegar allí.
          </div>
          <button 
            className="btn-primary" 
            onClick={() => window.alert("Gracias por su interés. Un asesor le contactará pronto. ☎️")} 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '8px', border: 'none', color: '#00163A', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
            Iniciar Contacto <ArrowUpRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

const ProcesoSection = () => {
  return (
    <div className="reveal-hidden" style={{ background: '#002147', padding: '80px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(197,160,89,0.1)', padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px' }}>
            <Zap size={16} color="#C5A059" />
            <span style={{ color: '#C5A059', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>METODOLOGÍA B2G · LICITACIONES CONIA</span>
          </div>
          <h2 style={{ color: '#FFFFFF', fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
            Del Pliego al Contrato en <span style={{ color: '#C5A059' }}>4 Pasos</span>
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Nuestra metodología IA-First garantiza propuestas técnicas superiores y adjudicaciones verificadas en SECOP II.
          </p>
        </div>

        {/* Grid 4 Pasos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', width: '100%' }}>
          
          {/* Conectores solo en desktop */}
          <div className="hidden-mobile" style={{ position: 'absolute', top: '50%', left: '20%', right: '20%', height: '1px', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', zIndex: 0, pointerEvents: 'none' }}>
            <ChevronRight size={20} color="rgba(197,160,89,0.4)" style={{ marginLeft: '5%' }} />
            <ChevronRight size={20} color="rgba(197,160,89,0.4)" />
            <ChevronRight size={20} color="rgba(197,160,89,0.4)" style={{ marginRight: '5%' }} />
          </div>

          {[
            { num: "01", icon: Radio, tit: "Identificamos", desc: "El Radar SECOP II monitorea en tiempo real las 13 provincias y detecta automáticamente licitaciones viables para la fundación.", tag: "Radar SECOP II" },
            { num: "02", icon: Sparkles, tit: "Analizamos", desc: "La IA lee el pliego completo, detecta criterios de adjudicación, calcula el score de viabilidad y genera alertas de riesgo en minutos.", tag: "Licitaciones ConIA" },
            { num: "03", icon: CheckCircle, tit: "Ejecutamos", desc: "Adjudicado el contrato, coordinamos la entrega total: suministros, eventos, servicios sociales y cobertura audiovisual.", tag: "Contrato adjudicado" },
            { num: "04", icon: FileCheck, tit: "Reportamos", desc: "Publicamos evidencia verificable en SECOP II y el Portal de Transparencia. Cero corrupción. Cero procesos fallidos. Todo trazable.", tag: "Ley 1712 ✓" }
          ].map((paso, idx) => {
            const PIcon = paso.icon;
            return (
              <div 
                key={idx} 
                className="reveal-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(197,160,89,0.15)',
                  borderRadius: '16px',
                  padding: '28px 22px',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s',
                  cursor: 'default',
                  transitionDelay: `${idx * 0.12}s`,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)';
                  (e.currentTarget.children[0] as HTMLElement).style.color = '#E8D09A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(197,160,89,0.15)';
                  (e.currentTarget.children[0] as HTMLElement).style.color = 'rgba(197,160,89,0.15)';
                }}
              >
                {/* Número top-left */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '48px', fontWeight: 900, color: 'rgba(197,160,89,0.15)', transition: 'color 0.25s', lineHeight: 1 }}>
                  {paso.num}
                </div>
                
                {/* Contenido */}
                <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    <PIcon size={20} color="#C5A059" />
                  </div>
                  <h3 style={{ margin: 0, color: '#E8D09A', fontSize: '16px', fontWeight: 800, position: 'relative', zIndex: 2 }}>{paso.tit}</h3>
                  <p style={{ margin: 0, color: '#9CA3AF', fontSize: '13px', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>{paso.desc}</p>
                </div>

                <div style={{ mt: 'auto', paddingTop: '24px', marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'inline-flex', background: 'rgba(0,33,71,0.5)', border: '1px solid rgba(197,160,89,0.3)', color: '#C5A059', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                    {paso.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
};

const TestimonioSection = () => {
  return (
    <div className="reveal-hidden" style={{ background: '#FFFFFF', padding: '64px 80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Comillas */}
        <div style={{ fontSize: '120px', color: 'rgba(197,160,89,0.15)', lineHeight: 0.8, marginBottom: '-40px', fontFamily: 'serif' }}>
          "
        </div>

        {/* Cita */}
        <p style={{ fontSize: '22px', color: '#002147', fontWeight: 500, lineHeight: 1.7, fontStyle: 'italic', zIndex: 1, position: 'relative', margin: 0 }}>
          Unidos fue la única fundación que llegó con la propuesta técnica completa y la ejecutó al cien por ciento. El Programa Familias Fuertes en Tunja fue un referente departamental. Los resultados hablan solos.
        </p>

        {/* Firma */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '32px', gap: '12px' }}>
          <div style={{ width: '32px', height: '2px', background: '#C5A059' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#002147', fontWeight: 900, fontSize: '18px' }}>
              PM
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#002147', fontSize: '15px', fontWeight: 800 }}>Dra. Patricia Morales</div>
              <div style={{ color: '#9CA3AF', fontSize: '13px', fontWeight: 500 }}>Secretaria de Desarrollo Social</div>
              <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600 }}>Gobernación de Boyacá · 2024</div>
            </div>
          </div>
        </div>

      </div>

      {/* Barra de logos institucionales */}
      <div style={{ background: '#F3F4F6', padding: '20px 48px', borderRadius: '16px', marginTop: '64px', maxWidth: '1000px', margin: '64px auto 0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px' }}>
        {[
          { icon: "🏛️", text: "Gobernación Boyacá" },
          { icon: "🇺🇳", text: "PNUD Colombia" },
          { icon: "⚖️", text: "Colombia Compra Eficiente" },
          { icon: "👨‍👩‍👧", text: "ICBF Boyacá" }
        ].map((item, idx, arr) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '11px', fontWeight: 600 }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.text}
            </div>
            {idx < arr.length - 1 && <div className="hidden-mobile" style={{ width: '1px', background: '#D1D5DB' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const catalogoPublico = [
  {
    id:"CP-001", nombre:"Papelería & Suministros Institucionales",
    desc:"Dotación completa para despachos municipales, alcaldías y comisarías de familia.",
    categoria:"Papelería & Oficina", emoji:"📋",
    precio:"Desde $45.000/unidad", entrega:"5 días hábiles",
    modalidad:"Contratación Directa", disponible:true,
    detalle:"Resmas, carpetas, bolígrafos, sellos, formularios oficiales y papelería con membrete institucional.",
    contratos_prev: 14
  },
  {
    id:"CP-002", nombre:"Uniformes & Dotación de Campo",
    desc:"Identificación institucional para funcionarios en territorio: chalecos, gorras y kits tácticos.",
    categoria:"Uniformes", emoji:"🦺",
    precio:"Desde $285.000/kit", entrega:"8 días hábiles",
    modalidad:"SECOP II", disponible:true,
    detalle:"Diseño personalizado con logo del municipio. Telas de alta resistencia para trabajo de campo.",
    contratos_prev: 8
  },
  {
    id:"CP-003", nombre:"Producción de Eventos Masivos",
    desc:"Organización integral de ferias, festivales y jornadas comunitarias para más de 500 personas.",
    categoria:"Eventos", emoji:"🎪",
    precio:"Desde $18.000.000/evento", entrega:"Coordinación 30 días antes",
    modalidad:"SECOP II", disponible:true,
    detalle:"Tarima, sonido, artistas, logística, permisos, seguridad, limpieza y cobertura audiovisual.",
    contratos_prev: 11
  },
  {
    id:"CP-004", nombre:"Cobertura Audiovisual 4K",
    desc:"Registro cinemático de obras, inauguraciones y logros de gestión del mandatario.",
    categoria:"Audiovisual", emoji:"🎬",
    precio:"Desde $3.500.000/día", entrega:"Inmediata",
    modalidad:"Contratación Directa", disponible:true,
    detalle:"Drones 4K, camarógrafos, edición profesional y paquete de redes sociales.",
    contratos_prev: 23
  },
  {
    id:"CP-005", nombre:"Equipos Tecnológicos para Oficinas",
    desc:"Soluciones de cómputo certificadas para oficinas gubernamentales y comisarías.",
    categoria:"Tecnología", emoji:"💻",
    precio:"Desde $1.800.000/equipo", entrega:"10 días hábiles",
    modalidad:"SECOP II", disponible:true,
    detalle:"Portátiles, tabletas, impresoras y kits de conectividad. Garantía extendida incluida.",
    contratos_prev: 6
  },
  {
    id:"CP-006", nombre:"Programas Psicosociales Familiares",
    desc:"Atención especializada a familias vulnerables en alianza con ICBF y comisarías.",
    categoria:"Social", emoji:"👨‍👩‍👧",
    precio:"Desde $890.000/familia/mes", entrega:"Inicio en 15 días",
    modalidad:"SECOP II", disponible:true,
    detalle:"Talleres, intervención individual, escuelas de padres y reporte ICBF. Alineado Ley 1361.",
    contratos_prev: 18
  },
  {
    id:"CP-007", nombre:"Material de Branding Institucional",
    desc:"Señalética, pendones, lonas y material de impacto visual para eventos y despachos.",
    categoria:"Papelería & Oficina", emoji:"🎨",
    precio:"Desde $125.000/pieza", entrega:"6 días hábiles",
    modalidad:"Contratación Directa", disponible:true,
    detalle:"Diseño incluido. Impresión de alta calidad. Entrega en el municipio.",
    contratos_prev: 31
  },
  {
    id:"CP-008", nombre:"Dotación Comisarías de Familia",
    desc:"Paquete integral de suministros especializados para el funcionamiento de comisarías.",
    categoria:"Papelería & Oficina", emoji:"⚖️",
    precio:"Desde $2.400.000/comisaría", entrega:"7 días hábiles",
    modalidad:"SECOP II", disponible:true,
    detalle:"Mobiliario básico, papelería oficial, formularios ICBF, señalética y kit de atención.",
    contratos_prev: 9
  },
];

const categoriasFiltro = ["Todos","Papelería & Oficina","Uniformes","Tecnología","Audiovisual","Eventos","Social"];

const CatalogoPublicoSection = ({ filtro, setFiltro, setProductoModal, setModalCotizacion, onCtaClick }: any) => {
  const catalogoFiltrado = filtro === "Todos" ? catalogoPublico : catalogoPublico.filter((p: any) => p.categoria === filtro);

  return (
    <div className="reveal-hidden" style={{ background: '#F3F4F6', padding: '72px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ENCABEZADO */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(197,160,89,0.1)', padding: '6px 16px', borderRadius: '9999px', marginBottom: '16px' }}>
            <Briefcase size={16} color="#C5A059" />
            <span style={{ color: '#C5A059', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>PORTAFOLIO B2G · CONTRATACIÓN PÚBLICA</span>
          </div>
          <h2 style={{ color: '#002147', fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
            Lo que Contratamos con el Estado <span style={{ color: '#C5A059' }}>— Su municipio puede tener esto</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            Suministros, servicios y soluciones para alcaldías, gobernaciones e ICBF de Boyacá. Todo disponible en SECOP II y contratación directa.
          </p>
        </div>

        {/* BARRA DE FILTROS */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
           {categoriasFiltro.map(cat => {
              const active = filtro === cat;
              return (
                 <button
                    key={cat}
                    onClick={() => setFiltro(cat)}
                    style={{
                       border: active ? '1px solid #C5A059' : '1px solid #EEF0F5',
                       background: active ? '#00163A' : '#FFFFFF',
                       color: active ? '#E8D09A' : '#4A5568',
                       padding: '8px 20px',
                       borderRadius: '20px',
                       fontSize: '13px',
                       fontWeight: active ? 800 : 500,
                       cursor: 'pointer',
                       boxShadow: active ? '0 2px 8px rgba(0,33,71,0.2)' : 'none',
                       transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                       if (!active) { e.currentTarget.style.background = 'rgba(197,160,89,0.08)'; e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)'; }
                    }}
                    onMouseLeave={(e) => {
                       if (!active) { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#EEF0F5'; }
                    }}
                 >
                    {cat}
                 </button>
              )
           })}
        </div>

        {/* GRID DE CARDS DEL CATÁLOGO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginTop: '28px' }}>
           {catalogoFiltrado.map((item: any) => (
              <div
                 key={item.id}
                 style={{
                    display: 'flex', flexDirection: 'column',
                    borderRadius: '16px', overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,33,71,0.08)',
                    transition: 'all 0.25s',
                    cursor: 'default',
                    height: '100%'
                 }}
                 onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,33,71,0.14), 0 0 0 1px rgba(197,160,89,0.4)';
                 }}
                 onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                 }}
              >
                 {/* 1. CABECERA */}
                 <div style={{ background: '#00163A', padding: '0', height: '96px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '40px', lineHeight: 1, textAlign: 'center' }}>{item.emoji}</span>
                    <div style={{
                       position: 'absolute', top: '12px', right: '12px',
                       background: item.modalidad === 'SECOP II' ? '#D1FAE5' : '#DBEAFE',
                       color: item.modalidad === 'SECOP II' ? '#1A7A4A' : '#1E40AF',
                       padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800
                    }}>
                       {item.modalidad}
                    </div>
                 </div>

                 {/* 2. CUERPO */}
                 <div style={{ background: '#FFFFFF', padding: '16px 18px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'monospace', marginBottom: '4px', fontWeight: 700 }}>{item.id}</div>
                    <div style={{ fontSize: '14px', color: '#002147', fontWeight: 800, lineHeight: 1.3, marginBottom: '8px' }}>{item.nombre}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.6, marginBottom: '12px' }}>{item.desc}</div>
                    
                    <div style={{ width: '100%', height: '1px', background: 'rgba(197,160,89,0.2)', marginBottom: '12px', marginTop: 'auto' }} />
                    
                    <div>
                       <div style={{ fontSize: '9px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>PRECIO REFERENCIAL</div>
                       <div style={{ fontSize: '15px', color: '#C5A059', fontWeight: 800 }}>{item.precio}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                       <Truck size={11} color="#9CA3AF" />
                       <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Entrega en {item.entrega}</span>
                    </div>
                 </div>

                 {/* 3. PIE */}
                 <div style={{ padding: '0 18px 18px', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                       <CheckCircle size={12} color="#1A7A4A" />
                       <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>Contratos previos: {item.contratos_prev}</span>
                    </div>
                    
                    <button
                       onClick={() => {
                           if (setProductoModal && setModalCotizacion) {
                               setProductoModal(item);
                               setModalCotizacion(true);
                           }
                       }}
                       style={{
                          width: '100%', padding: '11px', borderRadius: '10px',
                          background: 'linear-gradient(135deg, #002147 0%, #012D5A 100%)',
                          border: '1px solid rgba(197,160,89,0.4)',
                          color: '#FFFFFF', fontSize: '13px', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          cursor: 'pointer', transition: 'all 0.2s'
                       }}
                       onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)'; e.currentTarget.style.color = '#002147'; }}
                       onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #002147 0%, #012D5A 100%)'; e.currentTarget.style.color = '#FFFFFF'; }}
                    >
                       Solicitar Cotización <ArrowUpRight size={13} style={{ pointerEvents: 'none' }} />
                    </button>
                 </div>
              </div>
           ))}
        </div>

        {/* CTA CONTEXTUAL AL FINAL */}
        <div style={{ textAlign: 'center', marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
           <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: 600 }}>¿Necesita algo que no está en la lista?</div>
           <button
              onClick={() => onCtaClick && onCtaClick()}
              style={{
                 border: '1px solid #C5A059', background: 'transparent', color: '#002147',
                 padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700,
                 cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
           >
              Consultar solución personalizada →
           </button>
        </div>
      </div>
    </div>
  )
};

const ModalCotizacion = ({
  open, onClose, producto, formCot, setFormCot, enviandoCot, setEnviandoCot, cotEnviada, setCotEnviada, addToast
}: any) => {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', background: 'rgba(0,21,58,0.7)', backdropFilter: 'blur(6px)', animation: 'fadeIn 0.2s', padding: 0 }} onClick={onClose}>
        {/* PANEL LATERAL */}
        <div style={{ width: '480px', maxWidth: '100%', height: '100vh', background: '#FFFFFF', boxShadow: '-8px 0 48px rgba(0,21,58,0.25)', animation: 'slideInR 0.3s ease-out forwards', display: 'flex', flexDirection: 'column', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
           
           {/* HEADER */}
           <div style={{ background: '#00163A', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
             <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}><X size={24} /></button>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#00163A' }}>UF</span>
                </div>
                <div>
                   <h2 style={{ color: '#E8D09A', fontSize: '17px', fontWeight: 800, margin: 0 }}>Solicitar Cotización</h2>
                   <p style={{ color: '#C5A059', fontSize: '13px', margin: 0 }}>{producto?.nombre || 'Solicitud General'}</p>
                </div>
             </div>
           </div>

           {/* FILA DE CONTEXTO */}
           {producto && (
             <div style={{ background: '#F3F4F6', padding: '14px 28px', borderBottom: '1px solid #EEF0F5', borderLeft: '3px solid #C5A059', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '32px' }}>{producto.icon || '📦'}</span>
                <div>
                   <div style={{ color: '#002147', fontWeight: 800, fontSize: '14px' }}>{producto.nombre}</div>
                   <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600 }}>{producto.modalidad || 'Servicio Integral'} · {producto.precio || 'A cotizar'}</div>
                </div>
             </div>
           )}

           {/* FORMULARIO */}
           <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {!cotEnviada ? (
                <>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>NOMBRE COMPLETO</div>
                    <input type="text" value={formCot.nombre} onChange={e => setFormCot({...formCot, nombre: e.target.value})} style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', boxSizing: 'border-box' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 0 15px rgba(197,160,89,0.15)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#EEF0F5'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>MUNICIPIO O ENTIDAD</div>
                    <input type="text" value={formCot.municipio} onChange={e => setFormCot({...formCot, municipio: e.target.value})} style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', boxSizing: 'border-box' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 0 15px rgba(197,160,89,0.15)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#EEF0F5'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>CARGO</div>
                    <input type="text" value={formCot.cargo} onChange={e => setFormCot({...formCot, cargo: e.target.value})} style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', boxSizing: 'border-box' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 0 15px rgba(197,160,89,0.15)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#EEF0F5'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>CORREO INSTITUCIONAL</div>
                    <input type="email" value={formCot.correo} onChange={e => setFormCot({...formCot, correo: e.target.value})} style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', boxSizing: 'border-box' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 0 15px rgba(197,160,89,0.15)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#EEF0F5'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>PRODUCTO DE INTERÉS</div>
                    {producto ? (
                       <input type="text" disabled value={producto.nombre} style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#9CA3AF', background: '#F3F4F6', width: '100%', boxSizing: 'border-box' }} />
                    ) : (
                       <select style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', boxSizing: 'border-box' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 0 15px rgba(197,160,89,0.15)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#EEF0F5'; e.currentTarget.style.boxShadow = 'none'; }}>
                          <option value="">Seleccione un producto del catálogo...</option>
                          {catalogoPublico.map(p => (
                            <option key={p.id} value={p.nombre}>{p.nombre}</option>
                          ))}
                       </select>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 700 }}>DESCRIPCIÓN DE LA NECESIDAD</div>
                    <textarea value={formCot.mensaje} onChange={e => setFormCot({...formCot, mensaje: e.target.value})} style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.boxShadow = '0 0 15px rgba(197,160,89,0.15)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#EEF0F5'; e.currentTarget.style.boxShadow = 'none'; }} />
                  </div>
                  
                  <button 
                    onClick={() => {
                        setEnviandoCot(true);
                        setTimeout(() => {
                           setEnviandoCot(false);
                           setCotEnviada(true);
                           if (addToast) addToast("✅ Solicitud enviada. Un asesor de RR ALIADOS le contactará en 24h.", "success", 5000);
                           setTimeout(() => {
                               onClose();
                               setCotEnviada(false);
                               setFormCot({nombre:"", municipio:"", cargo:"", correo:"", mensaje:""});
                           }, 2000);
                        }, 1800);
                    }}
                    disabled={enviandoCot}
                    style={{ 
                       marginTop: 'auto',
                       display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                       padding: '16px', borderRadius: '10px', width: '100%', border: 'none',
                       background: enviandoCot ? '#EEF0F5' : 'linear-gradient(135deg, #002147 0%, #012D5A 100%)',
                       color: enviandoCot ? '#6B7280' : '#FFFFFF',
                       boxShadow: enviandoCot ? 'none' : '0 0 0 1px rgba(197,160,89,0.3)',
                       fontWeight: 800, fontSize: '15px', cursor: enviandoCot ? 'not-allowed' : 'pointer',
                       transition: 'all 0.3s'
                    }}
                  >
                     {enviandoCot ? (
                        <><RefreshCw size={18} className="animate-spin" /> Enviando...</>
                     ) : (
                        <><Send size={18} /> Enviar Solicitud</>
                     )}
                  </button>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px', animation: 'fadeIn 0.3s' }}>
                   <CheckCircle size={48} color="#1A7A4A" />
                   <h3 style={{ fontSize: '20px', color: '#002147', fontWeight: 800, margin: 0 }}>¡Solicitud Enviada!</h3>
                   <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>Un asesor se comunicará con usted en menos de 24 horas hábiles.</p>
                   <div style={{ background: '#F3F4F6', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#002147' }}>
                      📞 313 555 0100 · RR ALIADOS
                   </div>
                   <button 
                      onClick={() => {
                         onClose();
                         setTimeout(() => { setCotEnviada(false); setFormCot({nombre:"", municipio:"", cargo:"", correo:"", mensaje:""}); }, 300);
                      }}
                      style={{ marginTop: '24px', background: '#C5A059', color: '#00163A', padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                   >
                     Cerrar
                   </button>
                </div>
              )}
           </div>

           {/* FOOTER PANE */}
           <div style={{ padding: '16px 28px', borderTop: '1px solid #EEF0F5', textAlign: 'center', color: '#9CA3AF', fontSize: '11px', fontWeight: 600 }}>
             🔒 Su información es confidencial · Ley 1581 de 2012
           </div>
        </div>
    </div>
  );
};

const ContactoSection = ({ form, setForm, loading, setLoading, success, setSuccess, addToast, isMobile }: any) => {
  const Input = ({ label, type = "text", placeholder, name, value, onChange, textarea = false, select = false, options = [] }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      <label style={{ fontSize: '11px', color: '#4A5568', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', outline: 'none', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical', transition: 'all 0.2s' }}
          onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#EEF0F5'; e.target.style.boxShadow = 'none'; }}
        />
      ) : select ? (
        <select
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', outline: 'none', fontFamily: 'inherit', appearance: 'none', transition: 'all 0.2s' }}
          onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#EEF0F5'; e.target.style.boxShadow = 'none'; }}
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          style={{ border: '1px solid #EEF0F5', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', color: '#002147', background: '#FFFFFF', width: '100%', outline: 'none', fontFamily: 'inherit', transition: 'all 0.2s' }}
          onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#EEF0F5'; e.target.style.boxShadow = 'none'; }}
        />
      )}
    </div>
  );

  const handleUpdate = (name: string, val: string) => setForm({ ...form, [name]: val });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (addToast) {
        addToast(`✅ ¡Mensaje recibido! Un asesor de RR ALIADOS le contactará en menos de 24 horas hábiles.`, "success", 6000);
      }
    }, 2000);
  };

  return (
    <div id="sec-contacto" className="reveal-hidden" style={{ 
      position: 'relative', overflow: 'hidden', 
      background: 'linear-gradient(160deg, #00163A 0%, #002147 60%, #012D5A 100%)',
      padding: isMobile ? '60px 24px' : '80px 80px'
    }}>
      {/* Decorations */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(197,160,89,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,160,89,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.15)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '250px', height: '250px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.1)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '48px' : '64px', alignItems: 'flex-start' }}>
        
        {/* Left Column */}
        <div style={{ flex: isMobile ? '1 1 100%' : '0 0 55%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.3)', padding: '5px 14px', borderRadius: '20px', marginBottom: '24px' }}>
            <Phone size={12} color="#C5A059" />
            <span style={{ color: '#C5A059', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>CONTÁCTENOS · RESPUESTA EN 24H</span>
          </div>

          <h2 style={{ margin: '0 0 20px 0', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            <span style={{ display: 'block', color: '#FFFFFF', fontWeight: 900, fontSize: isMobile ? '32px' : '38px' }}>Hablemos de su</span>
            <span style={{ display: 'block', color: '#C5A059', fontWeight: 900, fontSize: isMobile ? '32px' : '38px' }}>próximo contrato</span>
          </h2>

          <p style={{ color: '#CBD2DC', fontSize: '16px', lineHeight: 1.8, maxWidth: '440px', margin: '0 0 32px 0' }}>
            Somos el puente entre la política pública y la ejecución real. Cuéntenos qué necesita su municipio y le diseñamos una solución B2G a la medida, verificable en SECOP II.
          </p>

          <div style={{ width: '80px', height: '4px', background: '#C5A059', borderRadius: '2px', marginBottom: '40px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
            {[
              { icon: Phone, title: "Línea directa", val: "313 555 0100 · RR ALIADOS" },
              { icon: Mail, title: "Correo institucional", val: "contacto@rraliados.co" },
              { icon: MapPin, title: "Sede principal", val: "Sogamoso, Boyacá · Colombia" },
              { icon: Clock, title: "Horario de atención", val: "Lunes a viernes · 8:00 am – 6:00 pm" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(197,160,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color="#C5A059" />
                  </div>
                  <div>
                    <div style={{ color: '#E8D09A', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</div>
                    <div style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 600 }}>{item.val}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {["🔒 Información confidencial", "⚡ Respuesta en 24h", "✅ Sin compromisos"].map(tag => (
              <span key={tag} style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.25)', color: '#E8D09A', fontSize: '11px', fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: isMobile ? '1 1 100%' : '0 0 45%', width: '100%' }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.97)', 
            borderRadius: '20px', 
            padding: isMobile ? '24px' : '36px 32px', 
            boxShadow: '0 24px 64px rgba(0,21,58,0.35)',
            border: '1px solid rgba(197,160,89,0.2)'
          }}>
            {!success ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#00163A' }}>UF</span>
                  </div>
                  <div>
                    <div style={{ color: '#002147', fontSize: '17px', fontWeight: 800 }}>Solicitar asesoría</div>
                    <div style={{ color: '#8A95A3', fontSize: '12px' }}>Sin costo · Sin compromiso</div>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(197,160,89,0.2)', marginBottom: '24px' }} />

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                  <Input label="Nombre Completo" name="nombre" placeholder="Dr. Carlos Amaya" value={form.nombre} onChange={handleUpdate} />
                  <Input label="Cargo" name="cargo" placeholder="Alcalde / Secretario / Director" value={form.cargo} onChange={handleUpdate} />
                  <Input label="Municipio o Entidad" name="municipio" placeholder="Municipio de Sogamoso" value={form.municipio} onChange={handleUpdate} />
                  <Input label="Teléfono de contacto" name="telefono" placeholder="300 000 0000" type="tel" value={form.telefono} onChange={handleUpdate} />
                  <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
                    <Input label="Correo Institucional" name="correo" placeholder="nombre@municipio.gov.co" type="email" value={form.correo} onChange={handleUpdate} />
                  </div>
                  <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
                    <Input 
                      label="¿Qué necesita?" 
                      name="interes" 
                      select 
                      value={form.interes} 
                      onChange={handleUpdate}
                      options={[
                        "Seleccione una opción...",
                        "Suministros y papelería institucional",
                        "Producción de eventos y festivales",
                        "Cobertura audiovisual 4K",
                        "Uniformes y dotación de campo",
                        "Programas psicosociales y sociales",
                        "Equipos tecnológicos",
                        "Asesoría en licitaciones (Licitaciones ConIA)",
                        "Otro — especificar en mensaje"
                      ]}
                    />
                  </div>
                  <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
                    <Input label="Mensaje (Opcional)" name="mensaje" textarea placeholder="Cuéntenos brevemente su necesidad..." value={form.mensaje} onChange={handleUpdate} />
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '12px',
                    background: loading ? '#EEF0F5' : 'linear-gradient(135deg, #002147 0%, #012D5A 100%)',
                    border: '1px solid rgba(197,160,89,0.4)',
                    color: loading ? '#8A95A3' : '#FFFFFF',
                    fontSize: '14px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)'; e.currentTarget.style.color = '#00163A'; } }}
                  onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = 'linear-gradient(135deg, #002147 0%, #012D5A 100%)'; e.currentTarget.style.color = '#FFFFFF'; } }}
                >
                  {loading ? (
                    <><RefreshCw size={15} className="animate-spin" /> Enviando...</>
                  ) : (
                    <><Send size={15} color="#C5A059" /> Enviar solicitud de asesoría</>
                  )}
                </button>

                <div style={{ marginTop: '14px', fontSize: '10px', color: '#8A95A3', textAlign: 'center', lineHeight: 1.6 }}>
                  🔒 Sus datos son confidenciales y no serán compartidos con terceros.<br />
                  Tratamiento de datos personales según Ley 1581 de 2012.
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeIn 0.4s' }}>
                <CheckCircle size={56} color="#1A7A4A" style={{ margin: '0 auto 20px', display: 'block' }} />
                <h3 style={{ color: '#002147', fontSize: '20px', fontWeight: 800, margin: '0 0 12px 0' }}>¡Solicitud enviada!</h3>
                <p style={{ color: '#8A95A3', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px 0' }}>
                  Gracias, {form.nombre}. Nuestro equipo revisará su solicitud y le contactará pronto.
                </p>
                <div style={{ color: '#4A5568', fontSize: '13px', fontWeight: 700, background: '#F7F8FA', padding: '12px', borderRadius: '10px', marginBottom: '32px' }}>
                  📞 313 555 0100 · RR ALIADOS Consulting
                </div>
                <button 
                  onClick={() => {
                    setSuccess(false);
                    setForm({ nombre:"", cargo:"", municipio:"", correo:"", telefono:"", mensaje:"", interes:"" });
                  }}
                  style={{ border: '1px solid #C5A059', background: 'transparent', color: '#9A7A3A', fontSize: '13px', fontWeight: 700, padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(197,160,89,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Enviar otra consulta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PublicLanding = ({ onLogin }: { onLogin: () => void }) => {
  const [transSection, setTransSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const [modalCotizacion, setModalCotizacion] = useState(false);
  const [productoModal, setProductoModal] = useState<any>(null);
  const [formCot, setFormCot] = useState({
    nombre:"", municipio:"", cargo:"", correo:"", mensaje:""
  });
  const [enviandoCot, setEnviandoCot] = useState(false);
  const [cotEnviada, setCotEnviada] = useState(false);
  const [filtroCatalogo, setFiltroCatalogo] = useState("Todos");
  const [toastAlert, setToastAlert] = useState<{msg: string, type: string} | null>(null);

  const [formContacto, setFormContacto] = useState({
    nombre:"", cargo:"", municipio:"", correo:"", telefono:"", mensaje:"", interes:""
  });
  const [enviandoContacto, setEnviandoContacto] = useState(false);
  const [contactoEnviado, setContactoEnviado] = useState(false);

  const addToast = (msg: string, type: string, duration: number = 5000) => {
    setToastAlert({msg, type});
    setTimeout(() => setToastAlert(null), duration);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-hidden').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderTransContent = (id: string) => {
    switch (id) {
      case 'estructura':
        return (
          <div style={{ color: 'white' }}>
            <h3 style={{ color: '#C5A059', marginTop: 0 }}>Estructura Orgánica</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: '24px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(197,160,89,0.3)' }}>Dirección General</div>
              <div style={{ width: '2px', height: '20px', background: 'rgba(197,160,89,0.3)' }} />
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>Coord. Proyectos</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>Coord. Financiera</div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>Coord. Jurídica</div>
              </div>
            </div>
          </div>
        );
      case 'presupuesto':
        const data = [
          { name: 'Ene', exec: 400 }, { name: 'Feb', exec: 300 }, { name: 'Mar', exec: 550 },
          { name: 'Abr', exec: 480 }, { name: 'May', exec: 600 }, { name: 'Jun', exec: 750 }
        ];
        return (
          <div style={{ color: 'white', height: '250px' }}>
            <h3 style={{ color: '#C5A059', marginTop: 0, marginBottom: '24px' }}>Ejecución Presupuestal 2025 (Millones COP)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#00163A', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '8px' }} />
                <Bar dataKey="exec" fill="#C5A059" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'paa':
        return (
          <div style={{ color: 'white' }}>
            <h3 style={{ color: '#C5A059', marginTop: 0, marginBottom: '24px' }}>Plan Anual de Adquisiciones 2025</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Suministro de dotación escolar', 'Servicios de apoyo psicosocial', 'Mantenimiento infraestructura', 'Auditoría externa'].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>{item}</span>
                  <Pill variant={i % 2 === 0 ? 'success' : 'warning'}>{i % 2 === 0 ? 'Publicado' : 'En borrador'}</Pill>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contratos':
        return (
          <div style={{ color: 'white' }}>
            <h3 style={{ color: '#C5A059', marginTop: 0, marginBottom: '24px' }}>Contratos SECOP II</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'CD-2024-089', obj: 'Prestación de servicios profesionales...', val: '$45.000.000', status: 'En ejecución' },
                { id: 'LP-2024-012', obj: 'Suministro de raciones alimentarias...', val: '$320.000.000', status: 'Liquidado' },
                { id: 'CM-2024-005', obj: 'Compra de equipos de cómputo...', val: '$85.000.000', status: 'Adjudicado' }
              ].map((c, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#E8D09A', fontFamily: 'monospace' }}>{c.id}</span>
                  <span style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.obj}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>{c.val}</span>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Pill variant={c.status === 'Liquidado' ? 'default' : 'success'}>{c.status}</Pill>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'informes':
        return (
          <div style={{ color: 'white' }}>
            <h3 style={{ color: '#C5A059', marginTop: 0, marginBottom: '24px' }}>Informes de Gestión</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {['Informe de Gestión 2024', 'Estados Financieros 2024', 'Dictamen Revisoría Fiscal'].map((doc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(197,160,89,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={20} color="#C5A059" />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>{doc}</span>
                  </div>
                  <button style={{ background: 'transparent', border: 'none', color: '#E8D09A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600 }}>
                    <Download size={14} /> PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pqrsd':
        return (
          <div style={{ color: 'white' }}>
            <h3 style={{ color: '#C5A059', marginTop: 0, marginBottom: '24px' }}>Radicar PQRSD</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <input type="text" placeholder="Nombre completo" style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%', boxSizing: 'border-box' }} />
              <input type="email" placeholder="Correo electrónico" style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%', boxSizing: 'border-box' }} />
              <select style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%', boxSizing: 'border-box', gridColumn: '1 / -1' }}>
                <option value="" style={{ color: '#000' }}>Tipo de solicitud...</option>
                <option value="peticion" style={{ color: '#000' }}>Petición</option>
                <option value="queja" style={{ color: '#000' }}>Queja</option>
                <option value="reclamo" style={{ color: '#000' }}>Reclamo</option>
              </select>
              <textarea placeholder="Mensaje" rows={4} style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '100%', boxSizing: 'border-box', gridColumn: '1 / -1', resize: 'none' }} />
              <button className="btn-primary" style={{ gridColumn: '1 / -1', padding: '14px', borderRadius: '8px', border: 'none', color: '#00163A', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                Enviar Solicitud
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Navbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '72px', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, background: '#00163A', borderBottom: '1px solid rgba(197,160,89,0.4)', boxShadow: '0 2px 20px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#00163A' }}>UF</span>
          </div>
          <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>Unidos</span>
        </div>
        <div className="hidden-mobile" style={{ display: 'flex', gap: '32px' }}>
          {[
            { label: 'Nosotros', id: 'sec-nosotros' },
            { label: 'Eventos', id: 'sec-eventos' },
            { label: 'Catálogo B2G', id: 'sec-catalogo' },
            { label: 'Transparencia', id: 'sec-transparencia' },
            { label: 'Contacto', id: 'sec-contacto' }
          ].map(link => (
            <span 
              key={link.label} 
              className="nav-link" 
              style={{ 
                color: hoveredLink === link.label ? '#FFFFFF' : 'rgba(255,255,255,0.75)', 
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
                borderBottom: hoveredLink === link.label ? '2px solid #C5A059' : '2px solid transparent',
                paddingBottom: '4px'
              }} 
              onClick={() => document.getElementById(link.id)?.scrollIntoView({behavior: "smooth"})}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #00163A 0%, #002147 50%, #012D5A 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '110px 24px 64px 24px'
      }}>
      {/* Background Grid */}
      <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Decorative Circles */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.15)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '20%', right: '-50px', width: '380px', height: '380px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.1)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.05)', zIndex: 0 }} />

      {/* Coordinates */}
      <div style={{ position: 'absolute', bottom: '120px', right: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'monospace', zIndex: 10 }}>
        6.9315° N, 72.7854° W · Boyacá, Colombia
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '60px', gap: '48px' }}>
        
        {/* Left Column */}
        <div style={{ flex: isMobile ? '1 1 100%' : '0 0 55%', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
          {/* Badge */}
          <div className="glass-card animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', marginBottom: '24px' }}>
            <Sparkles size={16} color="#C5A059" style={{ animation: 'pulseGold 2s infinite' }} />
            <span style={{ color: '#E8D09A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>
              TRANSFORMACIÓN DIGITAL B2G · BOYACÁ 2025
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px', letterSpacing: '-0.045em', alignItems: isMobile ? 'center' : 'flex-start' }}>
            <span className="animate-fade-up" style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '52px', lineHeight: 1.1, animationDelay: '0.1s' }}>
              El Salto Definitivo:
            </span>
            <span className="animate-fade-up" style={{ color: '#E8D09A', fontWeight: 900, fontSize: '52px', lineHeight: 1.1, animationDelay: '0.2s' }}>
              De Proveedor Tradicional
            </span>
            <span className="text-glow-gold typewriter-text" style={{ color: '#C5A059', fontWeight: 900, fontSize: '52px', lineHeight: 1.1 }}>
              a Institución Referente
            </span>
          </h1>

          {/* Subtitle */}
          <TypewriterSubtitle text="Plataforma de inteligencia gubernamental y gestión de reputación para consolidar su liderazgo en la contratación pública del departamento." delay={1000} />

          {/* Features Pills */}
          <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: '12px', marginBottom: '32px', animationDelay: '0.5s' }}>
            {["13 Provincias", "47 Licitaciones / Año", "Ley 1712 ✓", "PNUD Alineada", "IA Integrada"].map((feature, i, arr) => (
              <React.Fragment key={feature}>
                <span className="feature-pill" style={{ padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, color: '#E8D09A', cursor: 'default' }}>
                  {feature}
                </span>
                {i < arr.length - 1 && <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C5A059' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* CTAs */}
          <div className="animate-fade-up" style={{ display: 'flex', gap: '16px', animationDelay: '0.6s', justifyContent: isMobile ? 'center' : 'flex-start' }}>
             <button onClick={onLogin} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '10px', border: 'none', color: '#00163A', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
              <Lock size={18} />
              Acceso Institucional
            </button>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', color: '#E8D09A', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s ease' }}>
              Ver Portal Público
            </button>
          </div>
        </div>

        {/* Right Column (Hero Feature Image) */}
        {!isMobile && (
          <div style={{ flex: '0 0 45%', display: 'flex', justifyContent: 'flex-end', paddingLeft: '40px', alignSelf: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '440px', borderRadius: '12px', overflow: 'hidden' }}>
              
              {/* Fila 1 */}
              <div style={{ gridColumn: '1 / -1', height: '170px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                <img src="https://picsum.photos/seed/boyaca-familia/400/260" alt="Boyacá Familia" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} referrerPolicy="no-referrer" />
                <div style={{ position: 'absolute', bottom: '0', left: '0', background: 'rgba(0,33,71,0.85)', padding: '5px 12px', borderTopRightRadius: '10px', color: '#E8D09A', fontSize: '11px', fontWeight: 700 }}>Boyacá · 13 Provincias</div>
              </div>

              {/* Fila 2 */}
              <div style={{ height: '130px', borderRadius: '10px', overflow: 'hidden' }}>
                <img src="https://picsum.photos/seed/evento-social/190/180" alt="Evento Social" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} referrerPolicy="no-referrer" />
              </div>
              <div style={{ height: '130px', borderRadius: '10px', overflow: 'hidden' }}>
                <img src="https://picsum.photos/seed/comunidad-col/190/180" alt="Comunidad" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} referrerPolicy="no-referrer" />
              </div>

              {/* Fila 3 */}
              <div style={{ gridColumn: '1 / -1', height: '110px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                <img src="https://picsum.photos/seed/feria-pueblo/400/160" alt="Feria Pueblo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} referrerPolicy="no-referrer" />
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#C5A059', color: '#002147', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>+28 eventos ejecutados</div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="animate-fade-up" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', borderTop: '1px solid rgba(197,160,89,0.2)', background: 'rgba(0,22,58,0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 10, animationDelay: '0.8s', overflowX: 'auto' }}>
        <div style={{ minWidth: '800px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '22px 32px' }}>
          <StatItem target={47} label="Licitaciones activas" hasBorder={true} />
          <StatItem target={4.8} decimals={1} prefix="$" suffix="B" label="COP en contratos" hasBorder={true} />
          <StatItem target={13} label="Provincias cubiertas" hasBorder={true} />
          <StatItem target={94} suffix="%" label="Tasa de adjudicación" hasBorder={false} />
        </div>
      </div>
      </div>

      {/* Casos de Éxito Section */}
      <div id="sec-nosotros" className="reveal-hidden" style={{ background: 'linear-gradient(180deg, #F7F8FA 0%, #FFFFFF 100%)', padding: '72px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SecTitle 
            title="Impacto Comprobado en Boyacá" 
            subtitle="Contratos SECOP II verificados · 2023-2025"
          />
          
          <div className="cases-grid" style={{ marginTop: '40px' }}>
            {casos.map((caso, i) => {
              const Icon = caso.icon;
              const pillVariants = ['default', 'info', 'success', 'violet', 'warning', 'error'] as const;
              const variant = pillVariants[i % pillVariants.length];
              
              return (
                <div 
                  key={i} 
                  className="case-card" 
                  style={{ 
                    padding: 0, 
                    overflow: 'hidden',
                    border: 'none',
                    boxShadow: hoveredCard === i ? `0 12px 40px rgba(0,33,71,0.14), 0 0 0 2px ${caso.color}50` : '0 4px 12px rgba(0,33,71,0.06)'
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* BANDA DE IMAGEN */}
                  <div style={{ width: '100%', height: '130px', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={imagenPorCaso(caso.title)} 
                      alt={caso.title}
                      style={{ 
                        width: '100%', 
                        height: '130px', 
                        objectFit: 'cover', 
                        display: 'block',
                        transition: 'transform 0.4s ease',
                        transform: hoveredCard === i ? 'scale(1.06)' : 'scale(1)'
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: `linear-gradient(to bottom, transparent 30%, ${caso.color}B3 70%)` 
                    }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <Pill variant={variant}>{caso.cat}</Pill>
                    </div>
                  </div>
                  
                  <div style={{ padding: '16px 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    {/* 1. Fila superior */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <span style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 600 }}>{caso.year}</span>
                    </div>
                    
                    {/* 2 & 3. Título e Ícono */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '4px' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#002147', lineHeight: 1.4, paddingRight: '12px' }}>
                        {caso.title}
                      </h3>
                      <Icon size={20} color={caso.color} style={{ flexShrink: 0 }} />
                    </div>
                    
                    {/* 4. Separador */}
                    <div style={{ height: '1px', background: 'rgba(197,160,89,0.2)', margin: '4px 0' }} />
                    
                    {/* 5. Métrica principal */}
                    <div style={{ fontSize: '22px', fontWeight: 900, color: caso.color, letterSpacing: '-0.02em' }}>
                      {caso.metric}
                    </div>
                    
                    {/* 6. KPI */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>
                      <CheckCircle size={14} color="#1A7A4A" />
                      {caso.kpi}
                    </div>
                    
                    {/* 7. Fila inferior */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '12px', fontWeight: 500 }}>
                        <MapPin size={14} />
                        {caso.loc}
                      </div>
                      <div style={{ background: '#00163A', color: '#C5A059', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                        {caso.value}
                      </div>
                    </div>
                    
                    {/* 8. Tag SECOP II */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#1A7A4A', fontSize: '11px', fontWeight: 700, marginTop: '8px', background: '#D1FAE5', padding: '2px 8px', borderRadius: '4px', width: 'fit-content' }}>
                      SECOP II ✓
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <SectionCTA 
            texto="¿Quiere que su municipio sea el próximo caso de éxito?" 
            btnLabel="Hablar con un asesor →"
            btnColor="navy"
            onClick={() => addToast("📞 Le conectaremos con un asesor. Gracias.", "info")}
          />
        </div>
      </div>

      <EventosSection onCtaClick={() => { setProductoModal(catalogoPublico.find(p=>p.id==="CP-003")); setModalCotizacion(true); }} />
      
      <CoberturaSection onCtaClick={() => addToast("Hola desde [municipio]. Registraremos su interés. 🗺️", "info")} />
      
      <ProcesoSection />
      <TestimonioSection />
      
      <div id="sec-catalogo">
        <CatalogoPublicoSection 
          filtro={filtroCatalogo} 
          setFiltro={setFiltroCatalogo}
          setProductoModal={setProductoModal}
          setModalCotizacion={setModalCotizacion}
          onCtaClick={() => addToast("📞 Solicitud personalizada recibida. Le contactaremos en 24h. ✅", "success")}
        />
      </div>

      {/* Transparencia Section */}
      <div id="sec-transparencia" className="reveal-hidden" style={{ background: '#F3F4F6', padding: '72px 80px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SecTitle 
            title="Portal de Transparencia" 
            subtitle="Cumplimiento Ley 1712/2014 · Resolución 1519/2020 · SECOP II"
            action={
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#D1FAE5', color: '#1A7A4A', padding: '6px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700 }}>
                <CheckCircle size={14} />
                VERIFICADO
              </div>
            }
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px', marginTop: '36px', paddingBottom: '80px' }}>
            {transSections.map((section, i) => {
              const Icon = section.icon;
              const isPqrsd = section.id === 'pqrsd';
              
              return (
                <div 
                  key={i} 
                  className="trans-card animate-fade-up" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => setTransSection(transSection === section.id ? null : section.id)}
                >
                  <ArrowUpRight size={20} className="trans-arrow" />
                  <div className="trans-icon-wrapper" style={{ marginBottom: '16px' }}>
                    <Icon size={24} color="#C5A059" />
                  </div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 800, color: '#002147' }}>
                    {section.title}
                  </h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                    {section.desc}
                  </p>
                  <Pill variant={isPqrsd ? 'pulse' : 'success'}>
                    {isPqrsd ? 'En Línea' : 'Público'}
                  </Pill>
                </div>
              );
            })}
          </div>

          {/* Expanded Panel */}
          {transSection && (
            <div className="animate-fade-up" style={{ 
              background: 'linear-gradient(135deg, #002147 0%, #012D5A 100%)', 
              borderRadius: '16px', 
              padding: '32px', 
              marginTop: '32px',
              marginBottom: '80px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,33,71,0.15)'
            }}>
              <button 
                onClick={() => setTransSection(null)}
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: '#C5A059', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}
              >
                <X size={16} /> Cerrar
              </button>
              {renderTransContent(transSection)}
            </div>
          )}
          <SectionCTA 
            texto="Verifique todos nuestros contratos directamente en SECOP II"
            btnLabel="Ir a SECOP II →"
            btnColor="outline"
            padding="40px 0 24px 0"
            borderTop="1px solid #EEF0F5"
            onClick={() => addToast("🔗 Abriendo portal SECOP II... (disponible en versión real)", "info")}
          />
        </div>
      </div>

      <ContactoSection 
        form={formContacto}
        setForm={setFormContacto}
        loading={enviandoContacto}
        setLoading={setEnviandoContacto}
        success={contactoEnviado}
        setSuccess={setContactoEnviado}
        addToast={addToast}
        isMobile={isMobile}
      />

      {/* CTA Bottom Login */}
      <div className="reveal-hidden" style={{ background: '#002147', padding: '80px 48px', textAlign: 'center', borderTop: '1px solid rgba(197,160,89,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: 900, margin: 0 }}>
            ¿Listo para modernizar la contratación en su municipio?
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '16px', margin: 0 }}>
            Únase a los más de 13 municipios en Boyacá que ya optimizan su gestión con nuestra plataforma B2G.
          </p>
          <button 
            onClick={onLogin} 
            style={{ 
              marginTop: '16px',
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '16px 32px', borderRadius: '8px', border: 'none', 
              color: '#00163A', fontWeight: 800, fontSize: '15px', 
              cursor: 'pointer', transition: 'all 0.2s ease',
              background: '#C5A059'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(197,160,89,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Lock size={18} />
            Acceso Institucional
          </button>
        </div>
      </div>

      {/* Legal Bar */}
      <div style={{ background: '#00163A', padding: '24px 48px', borderTop: '1px solid rgba(197,160,89,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          {['Ley 1712', 'SECOP II', 'Colombia Compra Eficiente', 'PNUD'].map((badge, i, arr) => (
            <React.Fragment key={i}>
              <span className="legal-badge">{badge}</span>
              {i < arr.length - 1 && (
                <div style={{ width: '1px', height: '16px', background: 'rgba(197,160,89,0.3)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <ModalCotizacion 
        open={modalCotizacion} 
        onClose={() => { setModalCotizacion(false); setTimeout(() => { setCotEnviada(false); setFormCot({nombre:"", municipio:"", cargo:"", correo:"", mensaje:""}); }, 300); }}
        producto={productoModal}
        formCot={formCot}
        setFormCot={setFormCot}
        enviandoCot={enviandoCot}
        setEnviandoCot={setEnviandoCot}
        cotEnviada={cotEnviada}
        setCotEnviada={setCotEnviada}
        addToast={addToast}
      />

      {/* Toast Alert */}
      {toastAlert && (
        <div className="animate-fade-up" style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: toastAlert.type === 'success' ? '#1A7A4A' : '#002147', color: '#FFFFFF',
          padding: '12px 24px', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,33,71,0.2)',
          fontSize: '14px', fontWeight: 700, zIndex: 300, display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          {toastAlert.msg}
        </div>
      )}
    </div>
  );
};

export const LoginScreen = ({ onSuccess, onBack }: { onSuccess: () => void, onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    setTimeout(() => {
      if (email === 'admin@unidos.org' && password === 'unidos2026') {
        onSuccess();
      } else {
        setErr('Credenciales incorrectas');
        setLoading(false);
      }
    }, 1500);
  };

  const fillDemo = () => {
    setEmail('admin@unidos.org');
    setPassword('unidos2026');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#FFFFFF' }}>
      {/* Columna Izquierda (Decorativa) */}
      <div className="hidden-mobile" style={{
        flex: 1,
        background: 'linear-gradient(145deg, #00163A 0%, #002147 60%, #012D5A 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px'
      }}>
        {/* Decoraciones */}
        <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.15)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(197,160,89,0.1)', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '480px' }}>
          {/* Logo */}
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '20px', 
            background: 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(197,160,89,0.2)'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#00163A' }}>UF</span>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Unidos Fundación Social
          </h1>
          <p style={{ fontSize: '14px', color: '#E8D09A', margin: '0 0 32px 0', fontWeight: 500, letterSpacing: '0.05em' }}>
            Licitaciones ConIA · Motor B2G
          </p>

          <GoldLine />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '32px' }}>
            {[
              "⚡ Análisis IA de pliegos en minutos",
              "🛡️ Blindaje jurídico Ley 1712",
              "📡 Radar SECOP II en tiempo real",
              "🏆 94% tasa de adjudicación"
            ].map((feature, i) => (
              <div key={i} className="animate-fade-up" style={{ display: 'flex', alignItems: 'center', gap: '12px', animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', fontSize: '12px' }}>
                  ✓
                </div>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: 500 }}>{feature}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '64px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(197,160,89,0.1)', borderRadius: '8px', border: '1px solid rgba(197,160,89,0.2)' }}>
            <span style={{ color: '#C5A059', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>POWERED BY</span>
            <span style={{ color: '#E8D09A', fontSize: '12px', fontWeight: 900 }}>RR ALIADOS Consulting</span>
          </div>
        </div>
      </div>

      {/* Columna Derecha (Formulario) */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative'
      }}>
        {/* Botón Volver (Mobile) */}
        <button 
          onClick={onBack}
          className="hidden-desktop"
          style={{ 
            position: 'absolute', 
            top: '24px', 
            left: '24px', 
            background: 'transparent', 
            border: 'none', 
            color: '#6B7280', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '14px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        <div className="animate-fade-up" style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px' }}>
              ACCESO INSTITUCIONAL
            </div>
            <h2 style={{ color: '#002147', fontSize: '24px', fontWeight: 900, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
              Cerebro Institucional
            </h2>
            <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0 }}>
              Sistema privado · Actividad registrada
            </p>
          </div>

          {/* Credenciales Demo */}
          <div style={{ 
            background: 'rgba(197,160,89,0.08)', 
            border: '1px solid rgba(197,160,89,0.4)', 
            borderRadius: '12px', 
            padding: '16px', 
            marginBottom: '32px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Info size={14} color="#C5A059" />
              <span style={{ color: '#9A7A3A', fontSize: '12px', fontWeight: 700 }}>Credenciales Demo</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', alignItems: 'center' }}>
              <span style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 600 }}>Usuario</span>
              <span style={{ color: '#002147', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace' }}>admin@unidos.org</span>
              <span style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 600 }}>Contraseña</span>
              <span style={{ color: '#002147', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace' }}>unidos2026</span>
            </div>
            <button 
              type="button"
              onClick={fillDemo}
              style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                background: 'transparent', 
                border: 'none', 
                color: '#C5A059', 
                fontSize: '12px', 
                fontWeight: 700, 
                cursor: 'pointer' 
              }}
            >
              → Autocompletar
            </button>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {err && (
              <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
                {err}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Correo Electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 12px 12px 40px', 
                    borderRadius: '10px', 
                    border: '1px solid #E5E7EB', 
                    fontSize: '14px', 
                    color: '#002147',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }} 
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C5A059';
                    e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 12px 12px 40px', 
                    borderRadius: '10px', 
                    border: '1px solid #E5E7EB', 
                    fontSize: '14px', 
                    color: '#002147',
                    boxSizing: 'border-box',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }} 
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C5A059';
                    e.target.style.boxShadow = '0 0 0 3px rgba(197,160,89,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                marginTop: '8px',
                background: 'linear-gradient(135deg, #002147 0%, #012D5A 100%)', 
                border: '1px solid rgba(197,160,89,0.3)', 
                borderRadius: '10px', 
                padding: '14px', 
                color: '#FFFFFF', 
                fontSize: '15px', 
                fontWeight: 700, 
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,33,71,0.1)'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,33,71,0.35)';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,33,71,0.1)';
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" color="#C5A059" />
                  Autenticando...
                </>
              ) : (
                <>
                  <Lock size={18} color="#C5A059" />
                  Ingresar al Sistema
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center', color: '#9CA3AF', fontSize: '11px', fontWeight: 500 }}>
            Acceso restringido · Ley 1712/2014
          </div>
        </div>
      </div>
    </div>
  );
};

const RadarModule = ({ showToast }: { showToast: (msg: string) => void }) => {
  const licitaciones = [
    { id:"SEA-2025-112", obj:"Programa Familias Fuertes Fase III", ent:"Gobernación Boyacá", val:"$890M", score:91, estado:"VIABLE", days:12, cat:"Social" },
    { id:"DUI-2025-089", obj:"Atención Psicosocial Duitama", ent:"Alcaldía Duitama", val:"$420M", score:88, estado:"VIABLE", days:5, cat:"ICBF" },
    { id:"TUN-2025-067", obj:"Escuelas de Convivencia Tunja", ent:"Alcaldía Tunja", val:"$310M", score:76, estado:"ANÁLISIS", days:18, cat:"Educación" },
    { id:"SOG-2025-034", obj:"Suministros Comisarías Norte", ent:"Municipios Provincia Norte", val:"$185M", score:82, estado:"VIABLE", days:7, cat:"Logística" },
    { id:"PBO-2025-021", obj:"Formación Trabajo — Mujeres Rurales", ent:"SENA / Gobernación", val:"$280M", score:79, estado:"ANÁLISIS", days:22, cat:"Género" },
    { id:"CUB-2025-014", obj:"Enfoque Étnico Cubará", ent:"Resguardos Indígenas", val:"$160M", score:85, estado:"VIABLE", days:9, cat:"Étnico" },
    { id:"BOY-2025-098", obj:"Giro Boyacá Convivencia 2025", ent:"Gobernación Boyacá", val:"$1.2B", score:94, estado:"PRIORITARIO", days:3, cat:"Gobernación" },
    { id:"MON-2025-055", obj:"Programa Adulto Mayor", ent:"Alcaldía Moniquirá", val:"$95M", score:65, estado:"BAJA", days:30, cat:"Social" },
  ];

  const pieData = [
    { name: 'Social', value: 28 },
    { name: 'ICBF', value: 18 },
    { name: 'Educación', value: 15 },
    { name: 'Logística', value: 14 },
    { name: 'Género', value: 12 },
    { name: 'Étnico', value: 8 },
    { name: 'Otros', value: 5 },
  ];
  const COLORS = ['#C5A059', '#002147', '#1A7A4A', '#4A90D9', '#9A7A3A', '#012D5A', '#E5E7EB'];

  const trendData = [
    { mes: 'Ene', analisis: 8, adjudicadas: 6 },
    { mes: 'Feb', analisis: 12, adjudicadas: 9 },
    { mes: 'Mar', analisis: 15, adjudicadas: 11 },
    { mes: 'Abr', analisis: 19, adjudicadas: 14 },
    { mes: 'May', analisis: 23, adjudicadas: 17 },
    { mes: 'Jun', analisis: 28, adjudicadas: 22 }
  ];

  const getScoreColor = (score: number) => {
    if (score > 85) return '#1A7A4A';
    if (score > 70) return '#C5A059';
    return '#991B1B';
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'PRIORITARIO': return { bg: 'rgba(197,160,89,0.15)', text: '#C5A059' };
      case 'VIABLE': return { bg: 'rgba(26,122,74,0.15)', text: '#1A7A4A' };
      case 'ANÁLISIS': return { bg: 'rgba(74,144,217,0.15)', text: '#4A90D9' };
      case 'BAJA': return { bg: 'rgba(156,163,175,0.15)', text: '#6B7280' };
      default: return { bg: 'rgba(156,163,175,0.15)', text: '#6B7280' };
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ROW 1: KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <MetricCard 
          title="Oportunidades Activas"
          value="47"
          sub="+12 esta semana"
          icon={Radio}
          accentColor="#C5A059"
          sparkData={[{v:40},{v:43},{v:41},{v:45},{v:44},{v:47}]}
        />
        <MetricCard 
          title="COP En Análisis"
          value="$2.3B"
          sub="Estimado adjudicable"
          icon={TrendingUp}
          accentColor="#4A90D9"
          sparkData={[{v:1.8},{v:1.9},{v:2.0},{v:2.1},{v:2.2},{v:2.3}]}
        />
        <MetricCard 
          title="Score de Viabilidad"
          value="73%"
          sub="Promedio del portafolio"
          icon={Target}
          accentColor="#1A7A4A"
        />
        <MetricCard 
          title="Cierres Esta Semana"
          value="3"
          sub="Requieren acción urgente"
          icon={AlertCircle}
          accentColor="#991B1B"
          dark={true}
        />
      </div>

      {/* ROW 2: Two Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 65%) minmax(0, 35%)', gap: '24px' }}>
        {/* Left Column: Table */}
        <Card hover={false} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Licitaciones Activas</h3>
            <button style={{ background: 'transparent', border: 'none', color: '#C5A059', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Ver todas →</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#00163A', color: '#C5A059', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 2 }}>
                <tr>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>ID</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Objeto</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Entidad</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Valor</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Score IA</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Estado</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Días</th>
                  <th style={{ padding: '12px 28px', fontWeight: 700 }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {licitaciones.map((lic) => {
                  const stateStyle = getEstadoColor(lic.estado);
                  const isPrioritario = lic.estado === 'PRIORITARIO';
                  return (
                    <tr 
                      key={lic.id} 
                      style={{ 
                        borderBottom: '1px solid #F3F4F6', 
                        backgroundColor: '#FFFFFF',
                        transition: 'all 0.2s ease',
                        borderLeft: isPrioritario ? '3px solid #C5A059' : '3px solid transparent'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.04)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                    >
                      <td style={{ padding: '16px 28px', fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>{lic.id}</td>
                      <td style={{ padding: '16px 28px', fontSize: '13px', fontWeight: 700, color: '#002147', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lic.obj}>{lic.obj}</td>
                      <td style={{ padding: '16px 28px', fontSize: '12px', color: '#4B5563' }}>{lic.ent}</td>
                      <td style={{ padding: '16px 28px', fontSize: '13px', fontWeight: 700, color: '#00163A' }}>{lic.val}</td>
                      <td style={{ padding: '16px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} title="Score basado en análisis de pliegos, histórico de la entidad y capacidades de la fundación.">
                          <div style={{ width: '60px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${lic.score}%`, height: '100%', backgroundColor: getScoreColor(lic.score), borderRadius: '2px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: getScoreColor(lic.score) }}>{lic.score}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 28px' }}>
                        <span style={{ backgroundColor: stateStyle.bg, color: stateStyle.text, padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em' }}>
                          {lic.estado}
                        </span>
                      </td>
                      <td style={{ padding: '16px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: lic.days < 7 ? '#991B1B' : (lic.days <= 14 ? '#D97706' : '#9CA3AF'), fontSize: '12px', fontWeight: 700 }}>
                          {lic.days < 7 && <Clock size={12} />}
                          {lic.days}d
                        </div>
                      </td>
                      <td style={{ padding: '16px 28px' }}>
                        <button 
                          onClick={() => showToast(`IA analizando pliego: ${lic.obj}...`)}
                          style={{ backgroundColor: '#00163A', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002147'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00163A'}
                        >
                          Analizar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Column: Analysis Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Distribución por Categoría */}
          <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Distribución por Categoría</h3>
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#00163A', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '8px', color: '#FFFFFF' }}
                    itemStyle={{ color: '#C5A059', fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {pieData.map((entry, index) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }} />
                  <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 500 }}>{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Alertas Críticas */}
          <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Alertas Críticas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', backgroundColor: 'rgba(153,27,27,0.05)', borderRadius: '8px', borderLeft: '3px solid #991B1B' }}>
                <span style={{ fontSize: '16px' }}>⏰</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#991B1B' }}>BOY-2025-098 cierra en 3 días</span>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>Hace 2 horas</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', backgroundColor: 'rgba(217,119,6,0.05)', borderRadius: '8px', borderLeft: '3px solid #D97706' }}>
                <span style={{ fontSize: '16px' }}>📋</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#D97706' }}>Pliego DUI-2025-089 tiene adenda</span>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>Hace 5 horas</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', backgroundColor: 'rgba(26,122,74,0.05)', borderRadius: '8px', borderLeft: '3px solid #1A7A4A' }}>
                <span style={{ fontSize: '16px' }}>✅</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A7A4A' }}>SOG-2025-034 viabilidad confirmada</span>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>Ayer</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ROW 3: Trend Chart */}
      <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Tendencia de Análisis vs Adjudicaciones</h3>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '13px' }}>Evolución del pipeline de licitaciones (Ene - Jun 2025)</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#00163A' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Analizadas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#C5A059' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Adjudicadas</span>
            </div>
          </div>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAnalisis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00163A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00163A" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAdjudicadas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#00163A', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '8px', color: '#FFFFFF' }}
                itemStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                labelStyle={{ color: '#C5A059', fontWeight: 700, marginBottom: '4px' }}
              />
              <Area type="monotone" dataKey="analisis" name="Analizadas" stroke="#00163A" strokeWidth={3} fillOpacity={1} fill="url(#colorAnalisis)" />
              <Area type="monotone" dataKey="adjudicadas" name="Adjudicadas" stroke="#C5A059" strokeWidth={3} fillOpacity={1} fill="url(#colorAdjudicadas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const CRMModule = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [filter, setFilter] = useState('Todos');
  const filtros = ['Todos', 'Alcaldes', 'Secretarios', 'Despacho', 'ICBF'];

  const contactos = [
    { nombre:"Dr. Carlos Amaya", cargo:"Alcalde de Sogamoso", ent:"Alcaldía Sogamoso", tel:"313 555 0101", email:"alcalde@sogamoso.gov.co", nivel:3, cat:"Alcalde" },
    { nombre:"Ing. Patricia Niño", cargo:"Secretaria de Desarrollo Social", ent:"Gobernación Boyacá", tel:"313 555 0202", email:"pnino@boyaca.gov.co", nivel:3, cat:"Secretario" },
    { nombre:"Dr. Ramiro Barón", cargo:"Alcalde de Duitama", ent:"Alcaldía Duitama", tel:"313 555 0303", email:"alcalde@duitama.gov.co", nivel:2, cat:"Alcalde" },
    { nombre:"Sra. Gloria Morales", cargo:"Directora Regional ICBF", ent:"ICBF Boyacá", tel:"313 555 0404", email:"gmorales@icbf.gov.co", nivel:3, cat:"ICBF" },
    { nombre:"Dr. Hernán Pinzón", cargo:"Secretario de Hacienda", ent:"Gobernación Boyacá", tel:"313 555 0505", email:"hpinzon@boyaca.gov.co", nivel:2, cat:"Secretario" },
    { nombre:"Sra. Luz Marina Vega", cargo:"Gestora Social Despacho", ent:"Despacho Gobernador", tel:"313 555 0606", email:"gestora@boyaca.gov.co", nivel:3, cat:"Despacho" },
    { nombre:"Dr. Jairo Cárdenas", cargo:"Alcalde de Tunja", ent:"Alcaldía Tunja", tel:"313 555 0707", email:"alcalde@tunja.gov.co", nivel:3, cat:"Alcalde" },
    { nombre:"Ing. Sandra López", cargo:"Jefe Oficina Jurídica", ent:"Gobernación Boyacá", tel:"313 555 0808", email:"slopez@boyaca.gov.co", nivel:2, cat:"Secretario" },
  ];

  const filteredContactos = filter === 'Todos' ? contactos : contactos.filter(c => c.cat === filter || c.cat + 's' === filter);

  const getInitials = (name: string) => {
    const parts = name.replace(/Dr\.|Ing\.|Sra\./g, '').trim().split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  };

  const getGradient = (name: string) => {
    const colors = [
      ['#C5A059', '#9A7A3A'],
      ['#002147', '#012D5A'],
      ['#1A7A4A', '#105030'],
      ['#4A90D9', '#2A60A9'],
      ['#991B1B', '#701010']
    ];
    const index = name.length % colors.length;
    return `linear-gradient(135deg, ${colors[index][0]} 0%, ${colors[index][1]} 100%)`;
  };

  const today = new Date();
  const getEventDate = (daysToAdd: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() + daysToAdd);
    return {
      dia: d.getDate(),
      mes: d.toLocaleString('es-CO', { month: 'short' }).toUpperCase()
    };
  };

  const eventos = [
    { days: 3, title: "Cierre BOY-2025-098 — Gobernación", type: "URGENTE", color: "#991B1B", bg: "rgba(153,27,27,0.1)" },
    { days: 5, title: "Entrega documentos DUI-2025-089", type: "WARN", color: "#D97706", bg: "rgba(217,119,6,0.1)" },
    { days: 7, title: "Reunión Secretaría Duitama", type: "INFO", color: "#4A90D9", bg: "rgba(74,144,217,0.1)" },
    { days: 9, title: "Cierre SOG-2025-034", type: "WARN", color: "#D97706", bg: "rgba(217,119,6,0.1)" },
    { days: 12, title: "Audiencia pública Tunja", type: "INFO", color: "#002147", bg: "rgba(0,33,71,0.1)" },
    { days: 15, title: "Entrega oferta TUN-2025-067", type: "WARN", color: "#D97706", bg: "rgba(217,119,6,0.1)" },
  ];

  const chartData = [
    { municipio: 'Sogamoso', contactos: 14 },
    { municipio: 'Duitama', contactos: 11 },
    { municipio: 'Tunja', contactos: 18 },
    { municipio: 'Puerto Boyacá', contactos: 6 },
    { municipio: 'Cubará', contactos: 4 },
    { municipio: 'Chiquinquirá', contactos: 8 }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ROW 1: KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <MetricCard 
          title="Contactos de Poder"
          value="38"
          sub="Alcaldes, Secretarios, Jefes de Despacho"
          icon={Users}
          accentColor="#C5A059"
        />
        <MetricCard 
          title="Reuniones Este Mes"
          value="7"
          sub="3 confirmadas · 4 por agendar"
          icon={Calendar}
          accentColor="#4A90D9"
        />
        <MetricCard 
          title="Cierres Próximos"
          value="5"
          sub="En los siguientes 15 días"
          icon={Clock}
          accentColor="#991B1B"
        />
      </div>

      {/* ROW 2: Two Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 60%) minmax(0, 40%)', gap: '24px' }}>
        {/* Left Column: Directorio */}
        <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Directorio de Poder</h3>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Buscar contacto..."
                onClick={() => showToast("Búsqueda IA disponible en v2.0")}
                style={{
                  padding: '8px 12px 8px 36px',
                  borderRadius: '20px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F9FAFB',
                  fontSize: '13px',
                  width: '200px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                readOnly
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filtros.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: filter === f ? '1px solid #C5A059' : '1px solid #E5E7EB',
                  backgroundColor: filter === f ? 'rgba(197,160,89,0.1)' : '#FFFFFF',
                  color: filter === f ? '#C5A059' : '#6B7280',
                  transition: 'all 0.2s ease'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {filteredContactos.length === 0 ? (
              <EmptyState onClear={() => setFilter('Todos')} icon={Search} />
            ) : filteredContactos.map((c, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #F3F4F6',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.2s ease',
                  borderLeft: '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.04)';
                  e.currentTarget.style.borderLeft = '3px solid #C5A059';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderLeft = '3px solid transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: getGradient(c.nombre),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '16px'
                  }}>
                    {getInitials(c.nombre)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#002147' }}>{c.nombre}</span>
                      <span style={{ fontSize: '12px', color: '#C5A059' }}>
                        {'⭐'.repeat(c.nivel)}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{c.cargo}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '10px' }}>
                      <Building2 size={10} />
                      {c.ent}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => showToast(`Llamando a ${c.tel}...`)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280', backgroundColor: '#FFFFFF' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#002147'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                  >
                    <Phone size={16} />
                  </button>
                  <button 
                    onClick={() => showToast(`Enviando correo a ${c.email}...`)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280', backgroundColor: '#FFFFFF' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#002147'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                  >
                    <Mail size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Calendario */}
        <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Reloj Suizo · Próximos Cierres</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
            {eventos.map((e, i) => {
              const date = getEventDate(e.days);
              const isSoon = e.days <= 3;
              return (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#F9FAFB',
                  borderLeft: isSoon ? '3px solid #991B1B' : '3px solid transparent',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#00163A',
                    color: '#C5A059',
                    borderRadius: '8px',
                    width: '48px',
                    height: '48px',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1 }}>{date.dia}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>{date.mes}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#002147' }}>{e.title}</span>
                    <span style={{ 
                      fontSize: '10px', 
                      fontWeight: 800, 
                      color: e.color, 
                      backgroundColor: e.bg,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      alignSelf: 'flex-start'
                    }}>
                      {e.type}
                    </span>
                  </div>

                  {isSoon && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      <Bell size={14} color="#991B1B" className="animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button 
            onClick={() => showToast("Función disponible en v2.0")}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              backgroundColor: '#00163A', 
              color: '#FFFFFF', 
              border: 'none', 
              fontSize: '13px', 
              fontWeight: 600, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#002147'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00163A'}
          >
            <Calendar size={16} />
            Exportar al Calendario
          </button>
        </Card>
      </div>

      {/* ROW 3: Bar Chart */}
      <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Frecuencia de contacto por municipio</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00163A" />
                  <stop offset="100%" stopColor="#C5A059" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis dataKey="municipio" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#00163A', fontWeight: 600 }} width={100} />
              <Tooltip 
                cursor={{ fill: 'rgba(197,160,89,0.05)' }}
                contentStyle={{ backgroundColor: '#00163A', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '8px', color: '#FFFFFF' }}
                itemStyle={{ color: '#C5A059', fontWeight: 600 }}
              />
              <Bar dataKey="contactos" fill="url(#colorBar)" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const InventoryModule = ({ showToast }: { showToast: (msg: string) => void }) => {
  const productos = [
    { sku:"UF-001", nombre:"Kit Papelería Institucional", cat:"Papelería", stock:145, precio:"$85,000", img:"📄", estado:"OK" },
    { sku:"UF-002", nombre:"Chaleco Táctico RR Aliados", cat:"Uniformes", stock:38, precio:"$320,000", img:"🦺", estado:"OK" },
    { sku:"UF-003", nombre:"Portátil Dell Vostro", cat:"Tecnología", stock:4, precio:"$2,850,000", img:"💻", estado:"BAJO" },
    { sku:"UF-004", nombre:"Tableta Samsung A8", cat:"Tecnología", stock:12, precio:"$780,000", img:"📱", estado:"OK" },
    { sku:"UF-005", nombre:"Cámara Drone 4K", cat:"Audiovisual", stock:2, precio:"$4,500,000", img:"🚁", estado:"BAJO" },
    { sku:"UF-006", nombre:"Impresora Láser HP", cat:"Oficina", stock:7, precio:"$1,200,000", img:"🖨️", estado:"OK" },
    { sku:"UF-007", nombre:"Kit Señalética Evento", cat:"Branding", stock:0, precio:"$890,000", img:"🎪", estado:"AGOTADO" },
    { sku:"UF-008", nombre:"Megáfono Profesional", cat:"Eventos", stock:9, precio:"$450,000", img:"📢", estado:"OK" },
  ];

  const consumoData = [
    { mes: 'Oct', gasto: 12.5 },
    { mes: 'Nov', gasto: 15.2 },
    { mes: 'Dic', gasto: 28.4 },
    { mes: 'Ene', gasto: 8.5 },
    { mes: 'Feb', gasto: 18.2 },
    { mes: 'Mar', gasto: 22.1 }
  ];

  const getStockColor = (stock: number) => {
    const percentage = (stock / 200) * 100;
    if (percentage > 20) return '#1A7A4A';
    if (percentage >= 5) return '#D97706';
    return '#991B1B';
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ROW 1: KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <MetricCard 
          title="SKUs en Catálogo"
          value="127"
          icon={Package}
          accentColor="#C5A059"
        />
        <MetricCard 
          title="Órdenes Este Mes"
          value="23"
          icon={ShoppingCart}
          accentColor="#4A90D9"
        />
        <MetricCard 
          title="COP Gestionado"
          value="$48.3M"
          icon={Activity}
          accentColor="#1A7A4A"
        />
        <MetricCard 
          title="Alertas de Stock"
          value="3"
          icon={AlertCircle}
          accentColor="#991B1B"
        />
      </div>

      {/* ROW 2: Catálogo Grid */}
      <div className="responsive-grid-3">
        {productos.map((p, i) => {
          const isAgotado = p.estado === 'AGOTADO';
          const stockColor = getStockColor(p.stock);
          const stockPercentage = Math.min((p.stock / 200) * 100, 100);
          
          return (
            <Card key={i} hover={false} style={{ position: 'relative', overflow: 'hidden', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {isAgotado && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                  <span style={{ backgroundColor: '#991B1B', color: '#FFFFFF', padding: '8px 16px', borderRadius: '20px', fontWeight: 800, letterSpacing: '0.05em', transform: 'rotate(-10deg)', fontSize: '14px', boxShadow: '0 4px 12px rgba(153,27,27,0.3)' }}>
                    AGOTADO
                  </span>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                  {p.img}
                </div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 800, 
                  padding: '4px 8px', 
                  borderRadius: '12px',
                  backgroundColor: p.estado === 'OK' ? 'rgba(26,122,74,0.1)' : p.estado === 'BAJO' ? 'rgba(217,119,6,0.1)' : 'rgba(153,27,27,0.1)',
                  color: p.estado === 'OK' ? '#1A7A4A' : p.estado === 'BAJO' ? '#D97706' : '#991B1B'
                }}>
                  {p.estado}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.05em' }}>{p.sku}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#00163A', lineHeight: 1.3 }}>{p.nombre}</span>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>{p.cat}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#C5A059' }}>{p.precio}</span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>
                    <span>Stock: {p.stock}</span>
                    <span>Max: 200</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${stockPercentage}%`, height: '100%', backgroundColor: stockColor, borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => showToast(`Solicitud ${p.sku} registrada. Tiempo estimado: 3 días.`)}
                disabled={isAgotado}
                style={{ 
                  marginTop: '8px',
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  backgroundColor: isAgotado ? '#E5E7EB' : '#00163A', 
                  color: isAgotado ? '#9CA3AF' : '#FFFFFF', 
                  border: 'none', 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  cursor: isAgotado ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { if (!isAgotado) e.currentTarget.style.backgroundColor = '#002147'; }}
                onMouseLeave={(e) => { if (!isAgotado) e.currentTarget.style.backgroundColor = '#00163A'; }}
              >
                Solicitar Suministro
              </button>
            </Card>
          );
        })}
      </div>

      {/* ROW 3: Gráfico de Consumo */}
      <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Consumo de Suministros (Últimos 6 meses)</h3>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280', fontSize: '13px' }}>Gasto en millones de COP</p>
          </div>
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={consumoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGasto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#00163A', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '8px', color: '#FFFFFF' }}
                itemStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                labelStyle={{ color: '#C5A059', fontWeight: 700, marginBottom: '4px' }}
                formatter={(value: number) => [`$${value}M`, 'Gasto']}
              />
              <Area type="monotone" dataKey="gasto" name="Gasto" stroke="#C5A059" strokeWidth={3} fillOpacity={1} fill="url(#colorGasto)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const ORMModule = ({ showToast }: { showToast: (msg: string) => void }) => {
  const keywords = [
    { kw:"Unidos Fundación Social", pos:1, tipo:"Marca", estado:"✅ Dominado" },
    { kw:"Licitaciones sociales Boyacá", pos:3, tipo:"Sectorial", estado:"📈 Subiendo" },
    { kw:"Fundación familiar Sogamoso", pos:2, tipo:"Local", estado:"✅ Dominado" },
    { kw:"Contratación ICBF Boyacá", pos:7, tipo:"B2G", estado:"⚠️ Mejorar" },
    { kw:"Comisarías familia Duitama", pos:4, tipo:"Local", estado:"📈 Estable" },
    { kw:"Programas convivencia Boyacá", pos:5, tipo:"Sectorial", estado:"📈 Estable" },
  ];

  const menciones = [
    { text: "Artículo gobernación.boyaca.gov.co", sent: "pos" },
    { text: "Reseña municipio de Sogamoso", sent: "pos" },
    { text: "Mención en portal contratación", sent: "neu" },
    { text: "Nota de prensa El Boyacense", sent: "pos" },
    { text: "Comentario gestionado — removido", sent: "neg", neutralizado: true },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ROW 1: Score de Reputación */}
      <Card hover={false} style={{ padding: '48px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px', backgroundImage: 'radial-gradient(circle at center, rgba(197,160,89,0.05) 0%, transparent 70%)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '72px', fontWeight: 900, color: '#1A7A4A', lineHeight: 1 }}>8.7</span>
          <span style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score de Reputación Digital / 10</span>
        </div>
        
        <div style={{ display: 'flex', gap: '4px', color: '#C5A059' }}>
          <Star size={24} fill="currentColor" />
          <Star size={24} fill="currentColor" />
          <Star size={24} fill="currentColor" />
          <Star size={24} fill="currentColor" />
          <StarHalf size={24} fill="currentColor" />
        </div>
        
        <p style={{ margin: 0, fontSize: '16px', color: '#4B5563', maxWidth: '400px' }}>
          Posición dominante en Google para términos clave
        </p>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <span style={{ backgroundColor: 'rgba(26,122,74,0.1)', color: '#1A7A4A', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 700 }}>
            Sin resultados negativos pág. 1
          </span>
          <span className="animate-pulse" style={{ backgroundColor: 'rgba(197,160,89,0.1)', color: '#C5A059', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 700 }}>
            ORM Activo
          </span>
        </div>
      </Card>

      {/* ROW 2: Dos columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* IZQUIERDA: Posicionamiento */}
        <Card hover={false} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #E5E7EB' }}>
            <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Posicionamiento en Google</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#F9FAFB', color: '#6B7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <tr>
                  <th style={{ padding: '12px 28px', fontWeight: 600 }}>Keyword</th>
                  <th style={{ padding: '12px 28px', fontWeight: 600 }}>Posición</th>
                  <th style={{ padding: '12px 28px', fontWeight: 600 }}>Tipo</th>
                  <th style={{ padding: '12px 28px', fontWeight: 600 }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((k, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '16px 28px', fontSize: '13px', fontWeight: 600, color: '#002147' }}>{k.kw}</td>
                    <td style={{ padding: '16px 28px' }}>
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: k.pos <= 3 ? 'rgba(26,122,74,0.1)' : k.pos <= 5 ? 'rgba(217,119,6,0.1)' : 'rgba(153,27,27,0.1)',
                        color: k.pos <= 3 ? '#1A7A4A' : k.pos <= 5 ? '#D97706' : '#991B1B',
                        fontSize: '12px',
                        fontWeight: 800
                      }}>
                        {k.pos}
                      </span>
                    </td>
                    <td style={{ padding: '16px 28px' }}>
                      <span style={{ backgroundColor: '#F3F4F6', color: '#4B5563', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>
                        {k.tipo}
                      </span>
                    </td>
                    <td style={{ padding: '16px 28px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                      {k.estado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* DERECHA: Monitor de Menciones */}
        <Card hover={false} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, color: '#00163A', fontSize: '16px', fontWeight: 800 }}>Monitor de Menciones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {menciones.map((m, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '16px', 
                borderRadius: '12px', 
                backgroundColor: m.neutralizado ? 'rgba(153,27,27,0.03)' : '#F9FAFB',
                border: m.neutralizado ? '1px solid rgba(153,27,27,0.1)' : '1px solid #F3F4F6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '16px' }}>
                    {m.sent === 'pos' ? '🟢' : m.sent === 'neu' ? '🟡' : '🔴'}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: m.neutralizado ? '#6B7280' : '#002147', textDecoration: m.neutralizado ? 'line-through' : 'none' }}>
                    {m.text}
                  </span>
                </div>
                {m.neutralizado && (
                  <span style={{ backgroundColor: 'rgba(153,27,27,0.1)', color: '#991B1B', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em' }}>
                    NEUTRALIZADO
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ROW 3: Acciones ORM */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <Card hover={true} style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast("Abriendo editor de comunicados...")}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059' }}>
              <Send size={24} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#00163A' }}>Publicar Comunicado</span>
          </div>
          <ChevronRight size={20} color="#9CA3AF" />
        </Card>
        
        <Card hover={true} style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast("Solicitud de indexación enviada a Google Search Console.")}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(74,144,217,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90D9' }}>
              <Globe size={24} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#00163A' }}>Solicitar Indexación</span>
          </div>
          <ChevronRight size={20} color="#9CA3AF" />
        </Card>
        
        <Card hover={true} style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => showToast("Descargando reporte mensual ORM...")}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(26,122,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A7A4A' }}>
              <Download size={24} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#00163A' }}>Reporte Mensual ORM</span>
          </div>
          <ChevronRight size={20} color="#9CA3AF" />
        </Card>
      </div>
    </div>
  );
};

export const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeModule, setActiveModule] = useState('radar');
  const [time, setTime] = useState(new Date());
  const [toastMsg, setToastMsg] = useState('');
  const [isModuleLoading, setIsModuleLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarExpanded(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleModuleChange = (id: string) => {
    if (id === activeModule) return;
    setIsModuleLoading(true);
    setTimeout(() => {
      setActiveModule(id);
      setIsModuleLoading(false);
    }, 600);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const modules = [
    { id: 'radar', label: 'Radar de Licitaciones', icon: Target, badge: 47 },
    { id: 'crm', label: 'CRM Institucional', icon: Users },
    { id: 'inventory', label: 'Inventario y Logística', icon: Package },
    { id: 'orm', label: 'Reputación (ORM)', icon: MessageSquare },
  ];

  const activeModuleData = modules.find(m => m.id === activeModule);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarExpanded ? '280px' : '80px',
        backgroundColor: '#00163A',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(197,160,89,0.2)',
        position: 'relative',
        zIndex: 20
      }}>
        {/* Header */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(197,160,89,0.1)' }}>
          <div 
            onClick={() => showToast("Unidos Fundación Social v2.0 · RR ALIADOS")}
            style={{ 
            width: '32px', height: '32px', borderRadius: '8px', 
            background: 'linear-gradient(135deg, #C5A059 0%, #9A7A3A 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#00163A' }}>UF</span>
          </div>
          {isSidebarExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Centro de Mando</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A7A4A', animation: 'pulseGold 2s infinite' }} />
                <span style={{ color: '#1A7A4A', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em' }}>EN LÍNEA</span>
              </div>
            </div>
          )}
        </div>

        {/* Modules */}
        <div style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {modules.map((mod) => {
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleModuleChange(mod.id)}
                title={!isSidebarExpanded ? mod.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(197,160,89,0.15)' : 'transparent',
                  borderLeft: isActive ? '3px solid #C5A059' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: isActive ? 'rgba(197,160,89,0.2)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? '#C5A059' : '#9CA3AF',
                  flexShrink: 0
                }}>
                  <mod.icon size={18} />
                </div>
                {isSidebarExpanded && (
                  <span style={{ color: isActive ? '#FFFFFF' : '#9CA3AF', fontWeight: isActive ? 800 : 500, fontSize: '14px', flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                    {mod.label}
                  </span>
                )}
                {mod.badge && (
                  <div style={{
                    position: isSidebarExpanded ? 'static' : 'absolute',
                    top: isSidebarExpanded ? 'auto' : '4px',
                    right: isSidebarExpanded ? 'auto' : '4px',
                    backgroundColor: '#991B1B',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '10px'
                  }}>
                    {mod.badge}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(197,160,89,0.1)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSidebarExpanded && (
            <div style={{
              background: 'rgba(1,45,90,0.5)',
              border: '1px solid rgba(197,160,89,0.2)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#C5A059" />
                <span style={{ color: '#E8D09A', fontWeight: 800, fontSize: '13px', whiteSpace: 'nowrap' }}>Licitaciones ConIA</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A7A4A', animation: 'pulseGold 2s infinite', flexShrink: 0 }} />
                <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>47 oportunidades activas</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}>
                  <div style={{ width: '73%', height: '100%', backgroundColor: '#C5A059', borderRadius: '1px' }} />
                </div>
                <span style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 600, whiteSpace: 'nowrap' }}>73% viabilidad media</span>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #012D5A',
              backgroundColor: 'transparent',
              color: '#9CA3AF',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              justifyContent: isSidebarExpanded ? 'flex-start' : 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197,160,89,0.4)';
              e.currentTarget.style.color = '#C5A059';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#012D5A';
              e.currentTarget.style.color = '#9CA3AF';
            }}
          >
            <LogOut size={18} />
            {isSidebarExpanded && <span style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>Cerrar Sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{
          height: '72px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 12px rgba(0,33,71,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 10
        }}>
          {/* Left Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#002147', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Menu size={20} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 600 }}>Panel B2G</span>
                <ChevronRight size={14} color="#9CA3AF" />
                <span style={{ color: '#002147', fontSize: '14px', fontWeight: 800 }}>{activeModuleData?.label}</span>
              </div>
              <div style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 500 }}>
                Sogamoso, Boyacá · {time.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })} {time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Buscar licitación..."
                onClick={() => showToast("Búsqueda IA disponible en v2.0")}
                style={{
                  padding: '8px 12px 8px 36px',
                  borderRadius: '20px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F9FAFB',
                  fontSize: '13px',
                  width: '200px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                readOnly
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => showToast("Sincronizando SECOP II...")}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#002147'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
              >
                <RefreshCw size={16} />
              </button>
              <button
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280', position: 'relative' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#002147'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
              >
                <Bell size={16} />
                <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#991B1B', border: '2px solid #FFFFFF' }} />
              </button>
            </div>

            {/* Avatar */}
            <div 
              onClick={() => showToast("Sesión activa · admin@unidos.org · Rol: Administrador")}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #E5E7EB', paddingLeft: '20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ color: '#002147', fontSize: '13px', fontWeight: 700 }}>Administrador</span>
                <span style={{ color: '#6B7280', fontSize: '10px', fontWeight: 600 }}>Unidos F.S.</span>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #002147 0%, #012D5A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '14px' }}>
                AD
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '28px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', flex: 1 }}>
            {isModuleLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                  {[1,2,3,4].map(i => <div key={i} className="animate-pulse" style={{ height: '120px', backgroundColor: '#E5E7EB', borderRadius: '16px' }} />)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 65%) minmax(0, 35%)', gap: '24px' }}>
                  <div className="animate-pulse" style={{ height: '400px', backgroundColor: '#E5E7EB', borderRadius: '16px' }} />
                  <div className="animate-pulse" style={{ height: '400px', backgroundColor: '#E5E7EB', borderRadius: '16px' }} />
                </div>
              </div>
            ) : activeModule === 'radar' ? (
              <RadarModule showToast={showToast} />
            ) : activeModule === 'crm' ? (
              <CRMModule showToast={showToast} />
            ) : activeModule === 'inventory' ? (
              <InventoryModule showToast={showToast} />
            ) : activeModule === 'orm' ? (
              <ORMModule showToast={showToast} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', color: '#6B7280' }}>
                Módulo en desarrollo
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6B7280', flexWrap: 'wrap', gap: '16px' }}>
            <span>© 2025 Unidos Fundación Social · NIT 901.234.567-8 · Sogamoso, Boyacá</span>
            <span style={{ fontWeight: 600 }}>v2.0 · Prototipo Institucional</span>
            <span style={{ fontWeight: 600, color: '#00163A' }}>Desarrollado por RR ALIADOS</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="animate-fade-up" style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#002147',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,33,71,0.15)',
          fontSize: '14px',
          fontWeight: 600,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Info size={16} color="#C5A059" />
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');

  useEffect(() => {
    // Inject global CSS on mount
    const style = document.createElement('style');
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (view === 'landing') {
    return <PublicLanding onLogin={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginScreen onSuccess={() => setView('dashboard')} onBack={() => setView('landing')} />;
  }

  return <Dashboard onLogout={() => setView('landing')} />;
}
