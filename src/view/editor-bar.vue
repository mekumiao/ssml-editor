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
  <div class="editor-bar border-bottom">
    <BarWrapper>
      <BarWrapperGroup>
        <PlayMenu></PlayMenu>
      </BarWrapperGroup>
      <BarWrapperGroup>
        <PinyinMenu></PinyinMenu>
        <ReadMenu></ReadMenu>
        <DigitalMenu></DigitalMenu>
        <ContinuousMenu></ContinuousMenu>
        <AliasMenu></AliasMenu>
        <EnglishMenu></EnglishMenu>
      </BarWrapperGroup>
      <BarWrapperGroup>
        <ChangespeedMenu></ChangespeedMenu>
        <ManagementMenu></ManagementMenu>
        <ConversionMenu></ConversionMenu>
      </BarWrapperGroup>
      <BarWrapperGroup>
        <RhythmMenu></RhythmMenu>
        <MuteMenu></MuteMenu>
      </BarWrapperGroup>
      <BarWrapperGroup>
        <SpecialMenu></SpecialMenu>
        <BgmMenu></BgmMenu>
      </BarWrapperGroup>
    </BarWrapper>
  </div>
  <TryPlay></TryPlay>
</template>

<style lang="scss" scoped></style>
