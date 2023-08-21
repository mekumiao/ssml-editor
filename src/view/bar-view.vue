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
  SensitiveMenu,
  ConversionMenu,
  ManagementMenu
} from '../menu'
import {
  SpecialDragBox,
  BgmDragBox,
  SensitiveDragBox,
  ManagementDragBox,
  ConversionDragBox,
  TryPlay
} from '@/menu'
</script>

<template>
  <div class="content">
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
      <BarWrapperGroup>
        <SensitiveMenu></SensitiveMenu>
      </BarWrapperGroup>
    </BarWrapper>
  </div>
  <BgmDragBox></BgmDragBox>
  <SpecialDragBox></SpecialDragBox>
  <SensitiveDragBox></SensitiveDragBox>
  <ManagementDragBox></ManagementDragBox>
  <ConversionDragBox></ConversionDragBox>
  <TryPlay></TryPlay>
</template>

<style lang="scss" scoped></style>
