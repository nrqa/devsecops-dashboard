import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedNode, setSelectedNode] = useState(null);

  // Mock data representing pipeline scanning artifacts
  const vulnerabilityData = [
    { id: "CVE-2024-1234", package: "express", version: "v4.16.0", severity: "CRITICAL", cvss: 9.8, status: "Blocked" },
    { id: "CVE-2023-4567", package: "lodash", version: "v4.17.15", severity: "MEDIUM", cvss: 5.3, status: "Warning" }
  ];

  const dependencyTree = {
    name: "mmu-vulnerable-app (root)",
    type: "project",
    children: [
      { 
        name: "express v4.16.0", 
        status: "FAILED ZERO TRUST GATE", 
        remediation: "Upgrade to v4.18.0 immediately. Critical CVSS 9.8 vulnerability detected.",
        severity: "CRITICAL"
      },
      { 
        name: "lodash v4.17.15", 
        status: "WARNING", 
        remediation: "Upgrade to v4.17.21+. Medium CVSS 5.3 vulnerability detected.",
        severity: "MEDIUM"
      },
      { 
        name: "react v18.2.0", 
        status: "PASSED COMPLIANCE", 
        remediation: "No vulnerabilities found.",
        severity: "NONE"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🛡️</span>
            <h1 className="font-bold text-lg tracking-tight">DevSecOps Portal</h1>
          </div>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('dependencies')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dependencies' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              🌿 Graph View
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'compare' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              🔄 Compare Builds
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          FYP 1 Baseline • Environment: DevEx
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* TAB 1: DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Vulnerability Metrics Overview</h2>
              <p className="text-sm text-slate-500 mt-1">Real-time compilation tracking from the pipeline engine.</p>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Critical Severities</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">1</p>
                </div>
                <span className="text-2xl bg-red-50 p-3 rounded-lg">🚨</span>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Medium Severities</p>
                  <p className="text-3xl font-bold text-amber-500 mt-1">1</p>
                </div>
                <span className="text-2xl bg-amber-50 p-3 rounded-lg">⚠️</span>
              </div>
            </div>

            {/* Data Ingestion Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800">Ingested Pipeline Artifacts</h3>
              </div>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <th className="p-4">Vulnerability ID</th>
                    <th className="p-4">Target Dependency</th>
                    <th className="p-4">Installed Version</th>
                    <th className="p-4">Severity Rating</th>
                    <th className="p-4">CVSS Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vulnerabilityData.map((vuln) => (
                    <tr key={vuln.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-mono font-medium text-blue-600">{vuln.id}</td>
                      <td className="p-4 font-semibold text-slate-800">{vuln.package}</td>
                      <td className="p-4 text-slate-600 font-mono text-xs">{vuln.version}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${vuln.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                          {vuln.severity}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-700">{vuln.cvss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DEPENDENCIES TREE VIEW */}
        {activeTab === 'dependencies' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Software Supply Chain Mapping</h2>
              <p className="text-sm text-slate-500 mt-1">Visual interactive structure mapped via CycloneDX SBOM artifacts.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hierarchical Tree Map */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-4">Component Visual Hierarchy</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 text-white rounded-lg font-mono text-sm shadow-sm inline-block">
                    📦 {dependencyTree.name}
                  </div>
                  
                  <div className="pl-8 border-l-2 border-dashed border-slate-300 space-y-3">
                    {dependencyTree.children.map((child, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedNode(child)}
                        className={`p-3 rounded-lg border cursor-pointer font-mono text-xs transition-all flex items-center justify-between ${
                          child.severity === 'CRITICAL' ? 'bg-red-50/70 border-red-200 text-red-900 hover:bg-red-50' :
                          child.severity === 'MEDIUM' ? 'bg-amber-50/70 border-amber-200 text-amber-900 hover:bg-amber-50' :
                          'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>🔹 {child.name}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                          {child.severity === 'NONE' ? 'Secure' : 'Click to inspect'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Context Inspection Panel */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
                <h3 className="font-semibold text-slate-800 mb-3">Policy Engine Inspection</h3>
                {selectedNode ? (
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-xs text-slate-400 block uppercase font-mono">Component Node</span>
                      <strong className="text-slate-800 font-mono">{selectedNode.name}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block uppercase font-mono">Compliance Evaluation</span>
                      <span className={`inline-block font-bold text-xs mt-1 ${selectedNode.severity === 'NONE' ? 'text-green-600' : 'text-red-600'}`}>
                        ⚠️ {selectedNode.status}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400 block uppercase font-mono">Remediation Path</span>
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 text-xs mt-1 leading-relaxed">
                        {selectedNode.remediation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">Select an interactive component node from the graph hierarchy map to view its explicit policy outcome.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPARE VIEW */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Supply Chain Integrity Control</h2>
              <p className="text-sm text-slate-500 mt-1">Tracking package manifest drift between consecutive code compilation attempts.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex justify-between items-center">
                <div className="text-sm font-mono">
                  Comparing Manifest: <span className="text-green-400 font-bold">Build #11 (Pass)</span> vs <span className="text-red-400 font-bold">Build #12 (Fail)</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 uppercase font-mono tracking-wider">Integrity Drift Detected</span>
              </div>

              <div className="p-6 space-y-6">
                {/* Deletions Block */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">[-] Removed Compliance Packages</h3>
                  <div className="bg-red-50/60 border border-red-100 rounded-lg p-3 font-mono text-xs flex items-center justify-between text-red-900">
                    <div>
                      <span className="font-bold line-through">❌ express (v4.18.0)</span>
                      <span className="ml-3 opacity-70">— Secure structural upstream distribution artifact removed.</span>
                    </div>
                  </div>
                </div>

                {/* Additions Block */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-green-600 mb-2">[+] Added / Modified Packages</h3>
                  <div className="space-y-2">
                    <div className="bg-green-50/60 border border-green-100 rounded-lg p-3 font-mono text-xs flex items-center justify-between text-green-900">
                      <div>
                        <span className="font-bold">✅ express (v4.16.0)</span>
                        <span className="ml-3 opacity-70">— Reverted package configuration to vulnerable baseline tracking status.</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50/60 border border-green-100 rounded-lg p-3 font-mono text-xs flex items-center justify-between text-green-900">
                      <div>
                        <span className="font-bold">✅ left-pad (v1.3.0)</span>
                        <span className="ml-3 opacity-70">— Unverified deep dependency package introduced to software architecture registry.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outcome Evaluation Summary */}
                <div className="pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🚨</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Automated Pipeline Evaluation Result</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        Supply chain integrity verification failed. Structural drift indicates addition of outdated elements mapping to active CVE vectors. Ephemeral pipeline gate executed exit code 1 to restrict target deployment capabilities.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}