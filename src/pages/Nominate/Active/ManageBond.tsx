// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faBolt, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ButtonPrimary } from '@rossbulat/polkadot-dashboard-ui';
import BN from 'bn.js';
import { useApi } from 'contexts/Api';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { useFastUnstake } from 'contexts/FastUnstake';
import { useModal } from 'contexts/Modal';
import { useNetworkMetrics } from 'contexts/Network';
import { useStaking } from 'contexts/Staking';
import { useTransferOptions } from 'contexts/TransferOptions';
import { useUi } from 'contexts/UI';
import BondedGraph from 'library/Graphs/Bonded';
import { CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { OpenHelpIcon } from 'library/OpenHelpIcon';
import { useTranslation } from 'react-i18next';
import { AnyJson } from 'types';
import { humanNumber, planckBnToUnit } from 'Utils';
import { ButtonRowWrapper } from 'Wrappers';

export const ManageBond = () => {
  const { network, consts } = useApi();
  const { units } = network;
  const { metrics } = useNetworkMetrics();
  const { openModalWith } = useModal();
  const { activeAccount, isReadOnlyAccount } = useConnect();
  const { getLedgerForStash } = useBalances();
  const { getTransferOptions } = useTransferOptions();
  const { inSetup, getNominationsStatus } = useStaking();
  const { isSyncing } = useUi();
  const { checking, meta, isExposed, head } = useFastUnstake();
  const { bondDuration } = consts;
  const { activeEra, fastUnstakeErasToCheckPerBlock } = metrics;
  const ledger = getLedgerForStash(activeAccount);
  const { active }: { active: BN } = ledger;
  const nominationStatuses = getNominationsStatus();

  const allTransferOptions = getTransferOptions(activeAccount);

  const { freeBalance } = allTransferOptions;
  const { totalUnlocking, totalUnlocked, totalUnlockChuncks } =
    allTransferOptions.nominate;
  const { t } = useTranslation('pages');

  const activeNominations = Object.entries(nominationStatuses)
    .map(([k, v]: any) => (v === 'active' ? k : false))
    .filter((v) => v !== false);

  const fastUnstakeActive =
    fastUnstakeErasToCheckPerBlock > 0 &&
    !inSetup() &&
    !activeNominations.length;

  // TODO: also check if user is in `queueStatus`.
  const registered =
    head?.stashes.find((s: AnyJson) => s[0] === activeAccount) ?? null;

  const getFastUnstakeText = () => {
    const { currentEra, checked } = meta;
    if (checking) {
      return `Checking ${checked.length} of ${bondDuration} eras...`;
    }
    if (isExposed) {
      const lastExposed = activeEra.index - (currentEra || 0);
      return `Exposed ${lastExposed} Era${lastExposed !== 1 ? `s` : ``} Ago`;
    }
    if (registered) {
      return 'In Queue';
    }
    return 'Fast Unstake';
  };

  const fastUnstakeText = fastUnstakeActive ? getFastUnstakeText() : '';
  return (
    <>
      <CardHeaderWrapper>
        <h4>
          {t('nominate.bondedFunds')}
          <OpenHelpIcon helpKey="Bonding" />
        </h4>
        <h2>
          {humanNumber(planckBnToUnit(active, units))}&nbsp;{network.unit}
        </h2>
        <ButtonRowWrapper>
          <ButtonPrimary
            disabled={
              inSetup() || isSyncing || isReadOnlyAccount(activeAccount)
            }
            marginRight
            onClick={() =>
              openModalWith(
                'UpdateBond',
                { fn: 'add', bondType: 'stake' },
                'small'
              )
            }
            text="+"
          />
          <ButtonPrimary
            disabled={
              inSetup() || isSyncing || isReadOnlyAccount(activeAccount)
            }
            marginRight
            onClick={() =>
              openModalWith(
                'UpdateBond',
                { fn: 'remove', bondType: 'stake' },
                'small'
              )
            }
            text="-"
          />
          <ButtonPrimary
            disabled={
              inSetup() || isSyncing || isReadOnlyAccount(activeAccount)
            }
            iconLeft={faLockOpen}
            marginRight
            onClick={() =>
              openModalWith('UnlockChunks', { bondType: 'stake' }, 'small')
            }
            text={String(totalUnlockChuncks ?? 0)}
          />
          {fastUnstakeActive ? (
            <div>
              <ButtonPrimary
                disabled={checking}
                iconLeft={faBolt}
                onClick={() => {
                  openModalWith('ManageFastUnstake', {}, 'small');
                }}
                text={fastUnstakeText}
                colorSecondary
              />
            </div>
          ) : null}
        </ButtonRowWrapper>
      </CardHeaderWrapper>
      <BondedGraph
        active={planckBnToUnit(active, units)}
        unlocking={planckBnToUnit(totalUnlocking, units)}
        unlocked={planckBnToUnit(totalUnlocked, units)}
        free={planckBnToUnit(freeBalance, units)}
        inactive={inSetup()}
      />
    </>
  );
};

export default ManageBond;
