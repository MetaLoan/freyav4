import { YStack, XStack, Text, H3, Paragraph } from 'tamagui';

/**
 * 示例卡片组件
 * 展示如何使用 Tamagui 创建符合 Freya V3 设计风格的组件
 */
export function ExampleCard({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) {
  return (
    <YStack
      backgroundColor="$backgroundStrong"
      borderRadius="$4"
      padding="$4"
      space="$3"
      borderWidth={1}
      borderColor="$borderColor"
    >
      <H3 color="$goldSecondary" fontWeight="bold">
        {title}
      </H3>
      <Paragraph color="$colorTransparent" fontSize="$4">
        {description}
      </Paragraph>
    </YStack>
  );
}
