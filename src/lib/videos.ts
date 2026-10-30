export type VideoPlatform = 'youtube' | 'rutube' | 'vk';

const labels: Record<VideoPlatform, string> = {
  youtube: 'YouTube',
  rutube: 'Rutube',
  vk: 'VK Видео',
};

export function platformLabel(platform: VideoPlatform): string {
  return labels[platform] ?? platform;
}

/** «-12345678_456239017» → { oid: '-12345678', videoId: '456239017' } */
export function vkParts(id: string) {
  const [oid, videoId] = id.split('_');
  return { oid, videoId };
}
