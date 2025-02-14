'use client';

import { useState } from 'react';

export function LegalDisclaimer() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="p-2 bg-gray-50 rounded border border-gray-200 text-xs text-gray-500">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Legal Disclaimer</span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-600 hover:text-blue-800 text-xs"
        >
          {isCollapsed ? 'Show' : 'Hide'}
        </button>
      </div>
      
      {!isCollapsed && (
        <p className="leading-tight">
          This website provides information for general purposes only, with no warranties regarding accuracy or reliability. Content is AI-generated; users should verify critical information from authoritative sources. All content is provided under open-source principles with attribution requirements. We are not liable for any damages arising from website use. We comply with GDPR and CCPA, collecting only necessary data. External links are provided as-is without endorsement.
          <span className="block mt-1 text-[10px]">
            Last updated: {new Date(process.env.NEXT_PUBLIC_LAST_UPDATED || '').toLocaleDateString('en-US')}
          </span>
        </p>
      )}
    </div>
  );
} 