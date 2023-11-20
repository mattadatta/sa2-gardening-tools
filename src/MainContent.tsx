import { useState } from 'react';
import ChaoSave from './components/ChaoSave';
import TabButton from './components/TabButton';

const tabs = [
  { key: 'main', name: 'Main Save', component: ChaoSave, disabled: true },
  { key: 'chao', name: 'Chao Save', component: ChaoSave },
];

export default function MainContent() {
  const [activeTab, setActiveTab] = useState(tabs[1].key)

  const ActiveComponent = tabs.find((t) => t.key === activeTab)!.component;

  return (
    <>
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.name}
            isActive={activeTab === tab.name}
            isDisabled={tab.disabled ?? false}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>
      <ActiveComponent />
    </>
  );
}
