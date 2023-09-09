<script setup lang="ts">
import { BarWrapper, BarWrapperGroup } from '../components'
import {
  PlayMenu,
  PinyinMenu,
  ReadMenu,
  DigitalMenu,
  ContinuousMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  SpecialMenu,
  MuteMenu,
  BgmMenu,
  ConversionMenu,
  ManagementMenu,
  TryPlay,
} from '../menu'
</script>

<template>
  <div class="bar-view border-bottom">
    <BarWrapper>
      <BarWrapperGroup divider="green">
        <PlayMenu></PlayMenu>
      </BarWrapperGroup>
      <BarWrapperGroup divider="cyan">
        <PinyinMenu></PinyinMenu>
        <ReadMenu></ReadMenu>
        <DigitalMenu></DigitalMenu>
        <ContinuousMenu></ContinuousMenu>
        <AliasMenu></AliasMenu>
        <EnglishMenu></EnglishMenu>
      </BarWrapperGroup>
      <BarWrapperGroup divider="orange">
        <ChangespeedMenu></ChangespeedMenu>
        <ManagementMenu></ManagementMenu>
        <ConversionMenu></ConversionMenu>
      </BarWrapperGroup>
      <BarWrapperGroup divider="purple">
        <RhythmMenu></RhythmMenu>
        <MuteMenu></MuteMenu>
      </BarWrapperGroup>
      <BarWrapperGroup divider="yellow">
        <SpecialMenu></SpecialMenu>
        <BgmMenu></BgmMenu>
      </BarWrapperGroup>
    </BarWrapper>
  </div>
  <TryPlay></TryPlay>
</template>

<style lang="scss" scoped></style>
