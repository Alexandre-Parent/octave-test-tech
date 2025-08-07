<?php
function render_our_latest_impact_block_twig($block, $content = '', $is_preview = false) {
    $header = get_field('header_section');
    $hero_title = $header['hero_title'] ?? 'Our latest impact';
    $hero_subtitle = $header['hero_subtitle'] ?? '';
    $cta_buttons = $header['cta_buttons'] ?? [];
    
    $cards_repeater = get_field('cards_repeater') ?? [];
    
    $articles = [];
    foreach ($cards_repeater as $card) {
        $article_id = $card['selected_article'];
        $card_type = $card['card_type'];
        $is_decaled = $card['card_decaled'] ?? false;
        
        if (!$article_id) continue;
        
        $article = get_post($article_id);
        
        $desktop_image = get_the_post_thumbnail_url($article_id, 'full');
        $mobile_image = get_field('mobile_image', $article_id) ?: $desktop_image;
        $card_category = get_field('card_category', $article_id);
        $image_alt = get_post_meta(get_post_thumbnail_id($article_id), '_wp_attachment_image_alt', true) ?: $article->post_title;
        
        $card_classes = 'card';
        $image_class = 'card-image';
        $content_class = 'card-content';
        $title_class = 'card-title';
        
        switch ($card_type) {
            case 'double':
                $card_classes = 'card-double';
                $image_class = 'card-double-image';
                $content_class = 'card-double-content';
                $title_class = 'card-double-title';
                break;
            case 'full':
                $card_classes = 'card-large';
                $image_class = 'card-large-image';
                $content_class = 'card-large-content';
                $title_class = 'card-large-title';
                break;
        }
        
        if ($is_decaled && $card_type !== 'full') {
            $card_classes .= ' card-decaled';
        }
        
        if ($article->post_type === 'insights') {
            $card_classes .= ' card-bg-radial';
            $badge_class = 'card-badge-radial';
            $category_class = 'card-category-green';
            $link_class = 'card-link-white';
        } else {
            $card_classes .= ' card-bg-white';
            $badge_class = 'card-badge-white';
            $category_class = 'card-category-blue';
            $link_class = 'card-link-black';
        }
        
        $articles[] = [
            'id' => $article_id,
            'title' => $article->post_title,
            'link' => get_permalink($article_id),
            'post_type' => $article->post_type,
            'desktop_image' => $desktop_image,
            'mobile_image' => $mobile_image,
            'image_alt' => $image_alt,
            'card_category' => $card_category,
            'card_type' => $card_type,
            'is_decaled' => $is_decaled,
            'card_classes' => $card_classes,
            'image_class' => $image_class,
            'content_class' => $content_class,
            'title_class' => $title_class,
            'badge_class' => $badge_class,
            'category_class' => $category_class,
            'link_class' => $link_class
        ];
    }
    
    $context = Timber::context();
    $context['block'] = $block;
    $context['is_preview'] = $is_preview;
    $context['hero_title'] = $hero_title;
    $context['hero_subtitle'] = $hero_subtitle;
    $context['cta_buttons'] = $cta_buttons;
    $context['articles'] = $articles;
    
    Timber::render('blocks/our-latest-impact.twig', $context);
}