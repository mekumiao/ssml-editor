<script setup lang="ts">
import { BarWrapper, BarWrapperMenus } from '../components'
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
      <BarWrapperMenus>
        <PlayMenu></PlayMenu>
      </BarWrapperMenus>
      <BarWrapperMenus>
        <PinyinMenu></PinyinMenu>
        <ReadMenu></ReadMenu>
        <DigitalMenu></DigitalMenu>
        <ContinuousMenu></ContinuousMenu>
        <AliasMenu></AliasMenu>
        <EnglishMenu></EnglishMenu>
      </BarWrapperMenus>
      <BarWrapperMenus>
        <ChangespeedMenu></ChangespeedMenu>
        <ManagementMenu></ManagementMenu>
        <ConversionMenu></ConversionMenu>
      </BarWrapperMenus>
      <BarWrapperMenus>
        <RhythmMenu></RhythmMenu>
        <MuteMenu></MuteMenu>
      </BarWrapperMenus>
      <BarWrapperMenus>
        <SpecialMenu></SpecialMenu>
        <BgmMenu></BgmMenu>
      </BarWrapperMenus>
    </BarWrapper>
  </div>
  <TryPlay></TryPlay>
</template>

<style lang="scss" scoped></style>
