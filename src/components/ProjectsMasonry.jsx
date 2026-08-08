'use client';

import { MapPin, Wrench } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectsMasonry() {
  return (
    <section id="projects" style={{ padding: '100px 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 54px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>RECENT PROJECTS</div>
          <h2 className="heading-md">Powering Projects Across India</h2>
          <p className="text-body" style={{ marginTop: '12px' }}>
            From high-density metro rail viaducts to marine container terminals, see our machinery at work in major infrastructure landmarks.
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="masonry-grid-wrapper">
          {projects.map((proj) => (
            <div key={proj.id} className={`masonry-project-item ${proj.gridClass}`}>
              <img src={proj.image} alt={proj.title} />

              <div className="masonry-info-box">
                <div className="project-loc-tag">
                  <MapPin size={12} />
                  <span>{proj.location}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  {proj.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#E2E8F0', marginBottom: '12px' }}>
                  <Wrench size={14} style={{ color: 'var(--accent)' }} />
                  <span><strong>Equipment Deployed:</strong> {proj.equipmentUsed}</span>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.68rem', fontWeight: 700, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
