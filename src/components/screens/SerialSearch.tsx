
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Serial } from '@/types';
import DashedDivider from '../DashedDivider';

const mockSerial: Serial = {
  id: 's12345',
  serial: 'WP58392',
  type: 'FIREARM',
  model: 'COMBAT PISTOL',
  owner: 'JANE DOE',
  status: 'REGISTERED',
  registeredDate: '2024-01-15',
  flags: {
    stolen: false,
    wanted: false
  }
};

const SerialSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Serial | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a serial number to search');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResult(mockSerial);
      setLoading(false);
      toast.success(`Search complete for serial "${searchQuery}"`);
    }, 800);
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-blue-400 font-bold mb-4">Search Serial Number</h2>
      
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter serial number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Serial Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="bg-card border border-border rounded-md p-4 mt-4 animate-slide-in">
          <div className="text-center mb-2">
            <h3 className="text-primary text-lg">------- SERIAL DATABASE ENTRY -------</h3>
            <p className="text-primary">---</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="data-line">
              <span className="text-primary">SERIAL:</span>
              <span>{searchResult.serial}</span>
            </div>
            <div className="data-line">
              <span className="text-primary">TYPE:</span>
              <span>{searchResult.type}</span>
            </div>
            
            <div className="data-line">
              <span className="text-primary">MODEL:</span>
              <span>{searchResult.model}</span>
            </div>
            <div className="data-line">
              <span className="text-primary">OWNER:</span>
              <span>{searchResult.owner}</span>
            </div>
            
            <div className="data-line">
              <span className="text-primary">STATUS:</span>
              <span>{searchResult.status}</span>
            </div>
            <div className="data-line">
              <span className="text-primary">REGISTERED DATE:</span>
              <span>{searchResult.registeredDate}</span>
            </div>
          </div>
          
          <DashedDivider />
          
          <div className="text-center my-2">
            <h3 className="text-primary">------- FLAGS -------</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="data-line">
              <span className="text-primary">STOLEN:</span>
              <span className={searchResult.flags.stolen ? 'text-destructive' : ''}>
                {searchResult.flags.stolen ? 'YES' : 'NO'}
              </span>
            </div>
            <div className="data-line">
              <span className="text-primary">WANTED:</span>
              <span className={searchResult.flags.wanted ? 'text-destructive' : ''}>
                {searchResult.flags.wanted ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SerialSearch;
