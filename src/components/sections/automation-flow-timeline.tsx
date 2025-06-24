"use client";

import React from "react";
import { Timeline, useTimelineContext } from "@/components/ui/timeline";
import { useDeviceDetection } from "@/lib/utils/device-detection";

// Компонент для блоков, которые реагируют на timeline
const TimelineBlock = ({ 
  stepIndex, 
  className, 
  hoverClassName, 
  children 
}: { 
  stepIndex: number; 
  className: string; 
  hoverClassName: string; 
  children: React.ReactNode; 
}) => {
  const { activeStep, isMobile } = useTimelineContext();
  const isActive = isMobile && activeStep >= stepIndex;
  
  return (
    <div className={`${className} ${isActive ? hoverClassName : ''}`}>
      {children}
    </div>
  );
};

export function AutomationFlowTimeline() {
  const { isMobile } = useDeviceDetection();
  
  const data = [
    {
      title: "Step 1",
      content: (
        <div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-6`}>
            Align on Scope. Kick Things Off
          </h3>
          <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-mono mb-8 leading-relaxed`}>
            We start by signing an NDA and holding a kickoff meeting to clarify your objectives and expectations. 
            This ensures that we are fully aligned on your needs, priorities, and timelines from the very beginning.
          </p>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'} mb-6`}>
            <div className={`bg-dark-purple/50 rounded-lg ${isMobile ? 'p-3' : 'p-4'} border border-primary/20 hover:border-primary/40 transition-all duration-300 group`}>
              <h4 className={`text-white font-semibold ${isMobile ? 'text-sm' : 'text-base'} mb-3`}>NDA Signing</h4>
              <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed font-mono`}>
                Secure confidentiality agreement to protect your business data and processes
              </p>
            </div>
            <div className={`bg-dark-purple/50 rounded-lg ${isMobile ? 'p-3' : 'p-4'} border border-primary/20 hover:border-primary/40 transition-all duration-300 group`}>
              <h4 className={`text-white font-semibold ${isMobile ? 'text-sm' : 'text-base'} mb-3`}>Kickoff Meeting</h4>
              <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed font-mono`}>
                Define objectives, expectations, and project timeline with all stakeholders
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Planning</span>
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Alignment</span>
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Security</span>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2", 
      content: (
        <div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-6`}>
            Understand Your Reality
          </h3>
          <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-mono mb-8 leading-relaxed`}>
            We dive deep into understanding your business operations through stakeholder interviews and process discovery. 
            We observe your current workflows, uncover inefficiencies, and identify where automation can add the most value.
          </p>
          <div className="space-y-4 mb-6">
            <TimelineBlock
              stepIndex={1}
              className="bg-gradient-to-r from-dark-purple/30 to-transparent p-4 rounded-lg border-l-2 border-secondary/60 hover:border-secondary transition-all duration-300 group"
              hoverClassName="!border-secondary"
            >
              <h4 className="text-white font-semibold mb-2">
                Stakeholder Interviews
              </h4>
              <p className="text-light-gray text-sm font-mono">Deep conversations with key team members to understand pain points and goals</p>
            </TimelineBlock>
            <TimelineBlock
              stepIndex={1}
              className="bg-gradient-to-r from-dark-purple/30 to-transparent p-4 rounded-lg border-l-2 border-secondary/60 hover:border-secondary transition-all duration-300 group"
              hoverClassName="!border-secondary"
            >
              <h4 className="text-white font-semibold mb-2">
                Process Discovery
              </h4>
              <p className="text-light-gray text-sm font-mono">Detailed analysis of current workflows to identify bottlenecks and opportunities</p>
            </TimelineBlock>
            <TimelineBlock
              stepIndex={1}
              className="bg-gradient-to-r from-dark-purple/30 to-transparent p-4 rounded-lg border-l-2 border-secondary/60 hover:border-secondary transition-all duration-300 group"
              hoverClassName="!border-secondary"
            >
              <h4 className="text-white font-semibold mb-2">
                Value Identification
              </h4>
              <p className="text-light-gray text-sm font-mono">Pinpoint high-impact areas where automation will deliver the greatest ROI</p>
            </TimelineBlock>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Discovery</span>
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Analysis</span>
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Optimization</span>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-6`}>
            Map the Process. Spot the Gaps
          </h3>
          <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-mono mb-8 leading-relaxed`}>
            We document your existing business processes in detail, mapping every step, role, and decision point. 
            This step helps us highlight pain points, overlaps, and areas where automation can be implemented effectively.
          </p>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'} mb-6`}>
            <TimelineBlock
              stepIndex={2}
              className="bg-dark-gray/80 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all duration-300 group text-center"
              hoverClassName="!border-white/30"
            >
              <h4 className="text-white font-semibold text-sm mb-2">Process Mapping</h4>
              <p className="text-light-gray text-xs font-mono">Visual documentation of all workflow steps</p>
            </TimelineBlock>
            <TimelineBlock
              stepIndex={2}
              className="bg-dark-gray/80 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all duration-300 group text-center"
              hoverClassName="!border-white/30"
            >
              <h4 className="text-white font-semibold text-sm mb-2">Gap Analysis</h4>
              <p className="text-light-gray text-xs font-mono">Identify inefficiencies and missing connections</p>
            </TimelineBlock>
            <TimelineBlock
              stepIndex={2}
              className="bg-dark-gray/80 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all duration-300 group text-center"
              hoverClassName="!border-white/30"
            >
              <h4 className="text-white font-semibold text-sm mb-2">Opportunity Mapping</h4>
              <p className="text-light-gray text-xs font-mono">Highlight automation potential and ROI</p>
            </TimelineBlock>
          </div>
          <TimelineBlock
            stepIndex={2}
            className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
            hoverClassName="!border-primary/40"
          >
            <h4 className={`text-white font-semibold mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Key Deliverables:</h4>
            <ul className={`space-y-1 text-light-gray ${isMobile ? 'text-xs' : 'text-sm'} font-mono`}>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                Detailed process flow diagrams
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                Pain point identification report
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                Automation opportunity assessment
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                ROI potential analysis
              </li>
            </ul>
          </TimelineBlock>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-6`}>
            Design the Future Flow
          </h3>
          <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-mono mb-8 leading-relaxed`}>
            Based on our analysis, we design a custom solution that will optimize your processes. We define what your future workflows should look like and ensure that the solution is tailored to meet your specific needs, with an emphasis on improving efficiency and reducing complexity.
          </p>
          <div className="space-y-6 mb-6">
            <TimelineBlock
              stepIndex={3}
              className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 rounded-xl border border-primary/30 hover:border-primary/50 transition-all duration-300 group"
              hoverClassName="!border-primary/50"
            >
              <h4 className={`text-white font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
                Solution Architecture
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-secondary font-semibold mb-2 text-sm">Technical Design</h5>
                  <ul className="text-light-gray text-xs space-y-1 font-mono">
                    <li>• System integration points</li>
                    <li>• Data flow architecture</li>
                    <li>• Security protocols</li>
                    <li>• Scalability planning</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-secondary font-semibold mb-2 text-sm">User Experience</h5>
                  <ul className="text-light-gray text-xs space-y-1 font-mono">
                    <li>• Interface wireframes</li>
                    <li>• User journey mapping</li>
                    <li>• Approval workflows</li>
                    <li>• Training requirements</li>
                  </ul>
                </div>
              </div>
            </TimelineBlock>
            
            <TimelineBlock
              stepIndex={3}
              className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent p-6 rounded-xl border border-secondary/30 hover:border-secondary/50 transition-all duration-300 group"
              hoverClassName="!border-secondary/50"
            >
              <h4 className={`text-white font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
                Custom Solution Blueprint
              </h4>
              <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed font-mono`}>
                Detailed technical specifications, implementation roadmap, and success metrics tailored specifically to your business needs and constraints.
              </p>
            </TimelineBlock>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Architecture</span>
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Design</span>
            <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 rounded-full border border-secondary/30">Optimization</span>
          </div>
        </div>
      ),
    },
    {
      title: "Step 5",
      content: (
        <div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white mb-6`}>
            Implementation & Deployment
          </h3>
          <p className={`text-light-gray ${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-mono mb-8 leading-relaxed`}>
            We deploy the solution with minimal disruption to your operations, providing comprehensive testing, 
            data migration, system integration, and team training to ensure a smooth transition.
          </p>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-6'} mb-6`}>
            <div className="space-y-4">
              <TimelineBlock
                stepIndex={4}
                className="bg-dark-gray/60 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                hoverClassName="!border-primary/40"
              >
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 font-bold text-sm text-black">1</div>
                  Deploy & Test
                </h4>
                <p className="text-light-gray text-sm font-mono">Rigorous testing and quality assurance before full deployment</p>
              </TimelineBlock>
              <TimelineBlock
                stepIndex={4}
                className="bg-dark-gray/60 rounded-lg p-4 border border-secondary/20 hover:border-secondary/40 transition-all duration-300 group"
                hoverClassName="!border-secondary/40"
              >
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 font-bold text-sm text-black">2</div>
                  Data Migration
                </h4>
                <p className="text-light-gray text-sm font-mono">Seamless transfer of existing data with full compatibility checks</p>
              </TimelineBlock>
              <TimelineBlock
                stepIndex={4}
                className="bg-dark-gray/60 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                hoverClassName="!border-primary/40"
              >
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 font-bold text-sm text-black">3</div>
                  System Integration
                </h4>
                <p className="text-light-gray text-sm font-mono">Connect with existing tools and infrastructure smoothly</p>
              </TimelineBlock>
            </div>
            <TimelineBlock
              stepIndex={4}
              className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
              hoverClassName="!border-purple-500/40"
            >
              <h4 className={`text-white font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>Training & Support</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Comprehensive Training</h5>
                    <p className="text-light-gray text-xs font-mono">Full team onboarding and system education</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Ongoing Support</h5>
                    <p className="text-light-gray text-xs font-mono">Continued assistance as your business evolves</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="text-white text-sm font-medium">Performance Monitoring</h5>
                    <p className="text-light-gray text-xs font-mono">Regular optimization and system improvements</p>
                  </div>
                </div>
              </div>
            </TimelineBlock>
          </div>
          <div className="bg-gradient-to-r from-secondary/20 to-primary/20 rounded-lg p-4 border-l-4 border-secondary">
            <h4 className={`text-white font-semibold mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Success Guarantee</h4>
            <p className="text-light-gray text-sm font-mono">
              We ensure your team is fully equipped to leverage the new system and provide ongoing support 
              to maximize ROI and adapt to your business growth.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-dark-gray">
      <Timeline data={data} />
    </div>
  );
}