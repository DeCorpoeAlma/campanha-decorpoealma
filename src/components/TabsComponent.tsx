import React, { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string | ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: string;
  tabButtonClassName?: string;
  activeTabButtonClassName?: string;
  inactiveTabButtonClassName?: string;
  tabContainerClassName?: string;
}

const TabsComponent: React.FC<TabsProps> = ({
  tabs,
  initialTab,
  tabButtonClassName = 'px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300',
  activeTabButtonClassName = 'bg-light-blue text-white shadow-md',
  inactiveTabButtonClassName = 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  tabContainerClassName = 'flex justify-center mb-8 space-x-4',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id || '');

  return (
    <div>
      <div className={tabContainerClassName}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${tabButtonClassName} ${
              activeTab === tab.id ? activeTabButtonClassName : inactiveTabButtonClassName
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabsComponent;