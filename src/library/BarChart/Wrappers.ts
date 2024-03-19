// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import styled from 'styled-components';

export const BarChartWrapper = styled.div<{ $lessPadding?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.$lessPadding ? '0' : '0 0.5rem')};
  margin-top: 1rem;

  .available {
    width: 100%;
    display: flex;
    margin-top: 2.7rem;
    > div {
      display: flex;
      flex-flow: row wrap;
      padding: 0 0.35rem;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
  .d1 {
    background: var(--accent-color-primary);
    color: rgba(0, 0, 0, 0.95);
  }
  .d2 {
    background: var(--accent-color-secondary);
    color: rgba(0, 0, 0, 0.95);
  }
  .d3 {
    background: var(--text-color-secondary);
    color: rgba(255, 255, 255, 0.95);
  }
  .d4 {
    background: var(--button-tertiary-background);
    color: var(--text-color-secondary);
  }
`;

export const Legend = styled.div`
  width: 100%;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: flex-end;
  height: 2.5rem;

  &.end {
    > h4 {
      flex-direction: row;
      flex-grow: 1;
      justify-content: flex-end;
      padding-right: 0;
    }
  }

  > h4 {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    margin: 0;
    padding: 0.5rem 1rem 0.25rem 1rem;

    &:first-child {
      padding-left: 0;
    }
    > span {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      border-radius: 0.25rem;
    }
  }
`;

export const Bar = styled.div`
  background: var(--button-secondary-background);
  display: flex;
  width: 100%;
  height: 3.75rem;
  border-radius: 0.65rem;
  overflow: hidden;

  > div {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    transition: width 1.5s cubic-bezier(0, 1, 0, 1);

    > span {
      position: absolute;
      left: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 0 0.8rem;
      width: 100%;
      font-size: 1.05rem;
    }
  }
`;