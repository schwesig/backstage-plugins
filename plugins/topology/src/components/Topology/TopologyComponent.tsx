import React from 'react';
import '@patternfly/patternfly/patternfly-charts-theme-dark.css';
import '@patternfly/react-core/dist/styles/base.css';
import { useTheme } from '@material-ui/core/styles';
import '@patternfly/patternfly/patternfly-theme-dark.css';
import { TopologyWorkloadView } from './TopologyWorkloadView';
import { K8sResourcesContext } from '../../hooks/K8sResourcesContext';
import { useAllWatchResources } from '../../hooks/useAllWatchResources';
import { ModelsPlural } from '../../models';

import './TopologyComponent.css';

const THEME_DARK = 'dark';
const THEME_DARK_CLASS = 'pf-theme-dark';

export const TopologyComponent = () => {
  const {
    palette: { type },
  } = useTheme();
  React.useEffect(() => {
    const htmlTagElement = document.documentElement;
    if (type === THEME_DARK) {
      htmlTagElement.classList.add(THEME_DARK_CLASS);
    } else {
      htmlTagElement.classList.remove(THEME_DARK_CLASS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const watchedResources = [
    ModelsPlural.deployments,
    ModelsPlural.pods,
    ModelsPlural.services,
    ModelsPlural.replicasets,
  ];

  const k8sResponseData = useAllWatchResources(watchedResources);

  return (
    <K8sResourcesContext.Provider value={k8sResponseData}>
      <div className="pf-ri__topology">
        <TopologyWorkloadView />
      </div>
    </K8sResourcesContext.Provider>
  );
};
