import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.colors import LinearSegmentedColormap

# Setup styling
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Inter', 'Arial', 'Helvetica', 'DejaVu Sans']
plt.rcParams['axes.linewidth'] = 1.5
BG = '#0a0e27'
TXT = '#e8ecf4'

OUT_DIR = "apresentacao/img"
os.makedirs(OUT_DIR, exist_ok=True)

def save_fig(fig, name):
    fig.savefig(os.path.join(OUT_DIR, f"{name}.png"), dpi=300, bbox_inches='tight', facecolor=BG, transparent=False)
    fig.savefig(os.path.join(OUT_DIR, f"{name}.svg"), format='svg', bbox_inches='tight', facecolor=BG, transparent=False)
    print(f"Generated {name}")

def draw_waxs_fibers():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor=BG)
    ax.set_facecolor(BG)
    
    # Draw cornea outline
    cornea = patches.Circle((0, 0), radius=5, fill=False, color='#475569', lw=3)
    ax.add_patch(cornea)
    
    # Draw center cross fibers
    for i in np.linspace(-3, 3, 15):
        ax.plot([i, i], [-4, 4], color='#94a3b8', lw=1.5, alpha=0.7)
        ax.plot([-4, 4], [i, i], color='#94a3b8', lw=1.5, alpha=0.7)
        
    # Draw circumferential fibers
    for r in np.linspace(3.5, 4.8, 6):
        circ = patches.Circle((0, 0), radius=r, fill=False, color='#e2e8f0', lw=1.5, alpha=0.8)
        ax.add_patch(circ)
        
    # Highlight deficit zone (Infero-temporal OD: 210 to 300 deg)
    # Temporal is LEFT (-x), Nasal is RIGHT (+x) for OD examiner view
    # 210 to 300 degrees is in the bottom-left quadrant
    theta = np.linspace(np.radians(210), np.radians(300), 100)
    r_inner = 2.5
    r_outer = 4.8
    x_fill = np.concatenate([r_inner * np.cos(theta), r_outer * np.cos(theta[::-1])])
    y_fill = np.concatenate([r_inner * np.sin(theta), r_outer * np.sin(theta[::-1])])
    ax.fill(x_fill, y_fill, color='#ef4444', alpha=0.4)
    ax.plot(r_inner * np.cos(theta), r_inner * np.sin(theta), color='#ef4444', lw=2)
    ax.plot(r_outer * np.cos(theta), r_outer * np.sin(theta), color='#ef4444', lw=2)
    ax.plot([r_inner*np.cos(theta[0]), r_outer*np.cos(theta[0])], [r_inner*np.sin(theta[0]), r_outer*np.sin(theta[0])], color='#ef4444', lw=2)
    ax.plot([r_inner*np.cos(theta[-1]), r_outer*np.cos(theta[-1])], [r_inner*np.sin(theta[-1]), r_outer*np.sin(theta[-1])], color='#ef4444', lw=2)
    
    # Add labels
    ax.text(-5.5, 5.5, "OD", color=TXT, fontsize=24, fontweight='bold')
    ax.text(-5.5, 0, "T", color=TXT, fontsize=20, va='center')
    ax.text(5.5, 0, "N", color=TXT, fontsize=20, va='center')
    ax.text(0, 5.5, "S", color=TXT, fontsize=20, ha='center')
    ax.text(0, -5.5, "I", color=TXT, fontsize=20, ha='center')
    ax.text(-3.5, -3.5, "210°-300°\n44% deficit", color='#ef4444', fontsize=14, ha='center', va='center')
    
    ax.set_xlim(-6, 6)
    ax.set_ylim(-6, 6)
    ax.axis('off')
    save_fig(fig, "waxs_fibers")
    plt.close(fig)

def draw_vr_tent():
    fig, ax = plt.subplots(figsize=(10, 6), facecolor=BG)
    ax.set_facecolor(BG)
    
    # Draw cornea cross-section (curved)
    x = np.linspace(-5, 5, 100)
    y_top = 2 - 0.1 * x**2
    y_bot = 1.5 - 0.1 * x**2
    
    ax.fill_between(x, y_bot, y_top, color='#fcd34d', alpha=0.3)
    ax.plot(x, y_top, color='#fcd34d', lw=2)
    ax.plot(x, y_bot, color='#fcd34d', lw=2)
    
    # Draw ICRS (wedges)
    # Left ICRS
    icrs_l = patches.Polygon([(-3.5, 0.5), (-3, 0.6), (-2.5, 0.8), (-3.2, 1.2)], fill=True, color='#e2e8f0')
    ax.add_patch(icrs_l)
    # Right ICRS
    icrs_r = patches.Polygon([(3.5, 0.5), (3, 0.6), (2.5, 0.8), (3.2, 1.2)], fill=True, color='#e2e8f0')
    ax.add_patch(icrs_r)
    
    # Arrows
    # Peripheral up
    ax.arrow(-3, 1.3, 0, 0.8, head_width=0.3, head_length=0.4, fc='#3b82f6', ec='#3b82f6', lw=3)
    ax.arrow(3, 1.3, 0, 0.8, head_width=0.3, head_length=0.4, fc='#3b82f6', ec='#3b82f6', lw=3)
    # Central down
    ax.arrow(0, 2.5, 0, -0.6, head_width=0.3, head_length=0.4, fc='#3b82f6', ec='#3b82f6', lw=3)
    
    # Labels
    ax.text(-5.5, 3, "OD", color=TXT, fontsize=24, fontweight='bold')
    ax.text(-5.5, 0.5, "T", color=TXT, fontsize=20, va='center')
    ax.text(5.5, 0.5, "N", color=TXT, fontsize=20, va='center')
    
    ax.set_xlim(-6, 6)
    ax.set_ylim(-1, 4)
    ax.axis('off')
    save_fig(fig, "vr_tent")
    plt.close(fig)

def draw_vt_barrel():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor=BG)
    ax.set_facecolor(BG)
    
    # Draw cornea
    cornea = patches.Circle((0, 0), radius=5, fill=True, color='#1e293b', ec='#475569', lw=3)
    ax.add_patch(cornea)
    
    # Draw ICRS arc
    theta = np.linspace(np.radians(180), np.radians(360), 100)
    r = 3.5
    ax.plot(r * np.cos(theta), r * np.sin(theta), color='#e2e8f0', lw=6, solid_capstyle='round')
    
    # Draw hoop stress arrows
    for angle in np.linspace(0, 360, 24, endpoint=False):
        rad = np.radians(angle)
        x_start = 4 * np.cos(rad)
        y_start = 4 * np.sin(rad)
        dx = 0.5 * np.cos(rad)
        dy = 0.5 * np.sin(rad)
        ax.arrow(x_start, y_start, dx, dy, head_width=0.2, head_length=0.3, fc='#22c55e', ec='#22c55e', lw=2)
        
    # Circumferential tension arrow along the ring
    theta_arrow = np.linspace(np.radians(200), np.radians(340), 50)
    ax.plot(3 * np.cos(theta_arrow), 3 * np.sin(theta_arrow), color='#22c55e', lw=2, ls='--')
    
    # Labels
    ax.text(-5.5, 5.5, "OD", color=TXT, fontsize=24, fontweight='bold')
    ax.text(-5.5, 0, "T", color=TXT, fontsize=20, va='center')
    ax.text(5.5, 0, "N", color=TXT, fontsize=20, va='center')
    ax.text(0, 5.5, "S", color=TXT, fontsize=20, ha='center')
    ax.text(0, -5.5, "I", color=TXT, fontsize=20, ha='center')
    
    ax.set_xlim(-6, 6)
    ax.set_ylim(-6, 6)
    ax.axis('off')
    save_fig(fig, "vt_barrel")
    plt.close(fig)

def draw_vtau_wrench():
    fig, ax = plt.subplots(figsize=(10, 6), facecolor=BG)
    ax.set_facecolor(BG)
    
    # Draw cornea with cone
    x = np.linspace(-5, 5, 100)
    y_base = 2 - 0.1 * x**2
    # Add cone bulge on the left (temporal)
    cone = 1.2 * np.exp(-((x + 1.5)**2) / 1.5)
    y_top = y_base + cone
    y_bot = y_base - 0.5 + cone * 0.8
    
    ax.fill_between(x, y_bot, y_top, color='#fcd34d', alpha=0.3)
    ax.plot(x, y_top, color='#fcd34d', lw=2)
    ax.plot(x, y_bot, color='#fcd34d', lw=2)
    
    # Draw asymmetric ICRS (progressive)
    # Left is thick, right is thin
    icrs = patches.Polygon([(-3.5, 0.5), (-3, 0.6), (-2.5, 1.2), (-3.2, 1.8)], fill=True, color='#e2e8f0')
    ax.add_patch(icrs)
    
    # Torque arrows
    # Couple moment
    style = "Simple, tail_width=1.5, head_width=8, head_length=10"
    kw = dict(arrowstyle=style, color="#f97316")
    a1 = patches.FancyArrowPatch((-2.5, 2.8), (-0.5, 2.5), connectionstyle="arc3,rad=-0.3", **kw)
    a2 = patches.FancyArrowPatch((-0.5, 1.5), (-2.5, 1.8), connectionstyle="arc3,rad=-0.3", **kw)
    ax.add_patch(a1)
    ax.add_patch(a2)
    
    # Shift dashed line
    ax.plot([-1.5, 0], [y_top.max(), y_base.max()], color='#f97316', lw=2, ls='--')
    
    # Labels
    ax.text(-5.5, 4, "OD", color=TXT, fontsize=24, fontweight='bold')
    ax.text(-5.5, 0.5, "T", color=TXT, fontsize=20, va='center')
    ax.text(5.5, 0.5, "N", color=TXT, fontsize=20, va='center')
    
    ax.set_xlim(-6, 6)
    ax.set_ylim(-1, 5)
    ax.axis('off')
    save_fig(fig, "vtau_wrench")
    plt.close(fig)

def draw_fem_heatmap():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor=BG)
    ax.set_facecolor(BG)
    
    # Generate 2D radial heatmap mimicking 3D top-down view
    x = np.linspace(-5, 5, 100)
    y = np.linspace(-5, 5, 100)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    
    # Displacement field (highest at center)
    Z = np.exp(-(R**2)/10)
    
    # Custom colormap like FEBio
    colors = ['#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000']
    cmap = LinearSegmentedColormap.from_list('febio', colors)
    
    # Mask outside cornea
    Z[R > 4.8] = np.nan
    
    c = ax.contourf(X, Y, Z, levels=50, cmap=cmap)
    
    # Add wireframe
    for i in range(1, 6):
        circ = patches.Circle((0, 0), radius=i*0.96, fill=False, color='white', lw=0.5, alpha=0.3)
        ax.add_patch(circ)
    for angle in np.linspace(0, 360, 24, endpoint=False):
        rad = np.radians(angle)
        ax.plot([0, 4.8*np.cos(rad)], [0, 4.8*np.sin(rad)], color='white', lw=0.5, alpha=0.3)
        
    # Draw ICRS
    theta = np.linspace(np.radians(200), np.radians(340), 100)
    r = 3.2
    ax.plot(r * np.cos(theta), r * np.sin(theta), color='white', lw=5, solid_capstyle='round')
    
    # Add colorbar
    cbar = plt.colorbar(c, ax=ax, fraction=0.046, pad=0.04)
    cbar.set_label('Displacement (mm)', color=TXT)
    cbar.ax.yaxis.set_tick_params(color=TXT, labelcolor=TXT)
    
    ax.set_xlim(-6, 6)
    ax.set_ylim(-6, 6)
    ax.axis('off')
    save_fig(fig, "fem_heatmap")
    plt.close(fig)

if __name__ == "__main__":
    draw_waxs_fibers()
    draw_vr_tent()
    draw_vt_barrel()
    draw_vtau_wrench()
    draw_fem_heatmap()
