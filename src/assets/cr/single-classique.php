<?php

function render_our_latest_impact_block($block, $content = '', $is_preview = false) {
    $header = get_field('header_section');
    $hero_title = $header['hero_title'] ?? 'Our latest impact';
    $hero_subtitle = $header['hero_subtitle'] ?? '';
    $cta_buttons = $header['cta_buttons'] ?? [];
    
    $cards_repeater = get_field('cards_repeater') ?? [];
    
    ?>
    <section class="our-latest-impact">
        <section class="hero-section">
            <div class="hero-container">
                <div class="hero-content">
                    <h1 class="hero-title">
                        <?php echo esc_html($hero_title); ?>
                    </h1>
                    
                    <div class="hero-subtitle-container">
                        <?php if ($hero_subtitle): ?>
                            <p class="hero-subtitle"><?php echo esc_html($hero_subtitle); ?></p>
                        <?php endif; ?>
                        
                        <?php if ($cta_buttons): ?>
                            <div class="hero-cta-group">
                                <?php foreach ($cta_buttons as $button): ?>
                                    <a href="<?php echo esc_url($button['button_link']['url']); ?>" class="btn-cta">
                                        <img src="<?php echo get_template_directory_uri(); ?>/assets/pictos/arrow.png" alt="arrow" class="w-4 h-4" />
                                        <?php echo esc_html($button['button_link']['title']); ?>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="cards-section mb-[172px] md:px-0">
            <div class="max-w-[1316px] mx-auto cards-container">
                
                <?php foreach ($cards_repeater as $card): ?>
                    <?php 
                    $article_id = $card['selected_article'];
                    $card_type = $card['card_type'];
                    $is_decaled = $card['card_decaled'] ?? false;
                    
                    if (!$article_id) continue;
                    
                    $article = get_post($article_id);
                    
                   
                    $article_title = $article->post_title;
                    $desktop_image = get_the_post_thumbnail_url($article_id, 'full');
                    $mobile_image = get_field('mobile_image', $article_id) ?: $desktop_image;
                    $article_link = get_permalink($article_id);
                    $post_type = $article->post_type;
                    $card_category = get_field('card_category', $article_id) ?: 'INDUSTRY · CAPABILITY';
                    $image_alt = get_post_meta(get_post_thumbnail_id($article_id), '_wp_attachment_image_alt', true) ?: $article_title;
               
                    
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
                        default:
                            $card_classes = 'card';
                            $image_class = 'card-image';
                            $content_class = 'card-content';
                            $title_class = 'card-title';
                    }
                    
                    if ($is_decaled && $card_type !== 'full') {
                        $card_classes .= ' card-decaled';
                    }
                    
                    
                    if ($post_type === 'insights') {
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
                    ?>
                    
                    <div class="<?php echo esc_attr($card_classes); ?>">
                        <a href="<?php echo esc_url($article_link); ?>" class="card-link-full"></a>
                        
                        <div class="<?php echo esc_attr($image_class); ?>">
                            <picture>
                                <source media="(max-width: 1315px)" srcset="<?php echo esc_url($mobile_image); ?>">
                                <img src="<?php echo esc_url($desktop_image); ?>" alt="<?php echo esc_attr($image_alt); ?>" />
                            </picture>
                            <div class="card-badge <?php echo esc_attr($badge_class); ?>">
                                <?php echo $post_type === 'insights' ? 'INSIGHTS' : 'CASE STUDIES'; ?>
                            </div>
                        </div>
                        
                        <div class="<?php echo esc_attr($content_class); ?>">
                            <div class="card-category <?php echo esc_attr($category_class); ?>">
                                <?php echo esc_html($card_category); ?>
                            </div>
                            
                            <h<?php echo $card_type === 'full' ? '2' : '3'; ?> class="<?php echo esc_attr($title_class); ?>">
                                <?php echo esc_html($article_title); ?>
                            </h<?php echo $card_type === 'full' ? '2' : '3'; ?>>
                            
                            <a href="<?php echo esc_url($article_link); ?>" class="card-link <?php echo esc_attr($link_class); ?> card-link-underline">
                                Read more
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
                
            </div>
        </section>
    </section>
    <?php
}
