<script setup lang="ts">
import { BarWrapper, BarWrapperGroup, BarButton } from '../components'
import {
  SpeakerMenu,
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
  // SensitiveMenu,
  ConversionMenu,
  ManagementMenu,
  TryPlay
} from '../menu'
</script>

<template>
  <div class="bar-view border-bottom border-1">
    <BarWrapper>
      <BarWrapperGroup divider="green">
        <BarButton text="24K高清音质" icon="play" disabled></BarButton>
      </BarWrapperGroup>
      <BarWrapperGroup divider="cyan">
        <SpeakerMenu></SpeakerMenu>
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
      <!-- <BarWrapperGroup>
        <SensitiveMenu></SensitiveMenu>
      </BarWrapperGroup> -->
    </BarWrapper>
  </div>
  <TryPlay></TryPlay>
</template>

<style lang="scss" scoped></style>
