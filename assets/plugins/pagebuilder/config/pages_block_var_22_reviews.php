<?php

return [
  'title' => 'Отзывы (25)',

  'show_in_templates' => [5],

  //        'show_in_docs' => [ 2 ],

  //        'hide_in_docs' => [ 10, 63 ],

  'order' => 25,

  'container' => ['default'],

  'templates' => [
    'owner' => '<div class="card-reviews index-reviews">
            <div class="container">
                <div class="main-title">
                    [+title+]
                    [+more_link+]
                </div>					
                <div class="card-reviews-wrap">[+reviews+]</div>
            </div>
        </div>',
    'reviews' => '<div class="card-reviews-el">
            <div class="card-reviews-el-header">
                <div class="card-reviews-el-header-info">
                    [+name+]
                    [+position_review+]
                </div>
                <div class="card-reviews-el-header-soc">
                    [+social_links+]
                </div>
            </div>
            <div class="card-reviews-el-inner">
                <div class="card-reviews-el-inner__txt">
                    [+content+]
                </div>
                <div class="card-reviews-el-inner-btns">
                    [+more_link+]
                    [+original_review_doc+]
                </div>
            </div>
        </div>',
    'social_links' => '
        <a href="[+soc_link+]" target="_blank">
            <img src="[+soc_img+]" alt="иконка соцсети" loading="lazy">
        </a>
        '
  ],

  'fields' => [
    'title' => [
      'caption' => 'Заголовок блока',
      'type' => 'text',
      'default' => 'Отзывы',
    ],
    'more_link_text' => [
      'caption' => 'Текст на кнопке "Все отзывы"',
      'type' => 'text',
      'default' => '[~1119~]',
    ],
    'more_link_url' => [
      'caption' => 'Ссылка или id страницы с отзывами в теге [~id~]',
      'type' => 'text',
      'default' => 'Все отзывы',
    ],
    'reviews' => [
      'caption' => 'Отзывы',
      'type' => 'group',
      'fields' => [

        'name' => [
          'caption' => 'Имя оставившего комментарий',
          'type' => 'text',
        ],

        'position_review' => [
          'caption' => 'Должность оставившего комментарий',
          'type' => 'text',
        ],

        'social_links' => [
          'caption' => 'Ссылки на соцсети оставившего отзыв',
          'type' => 'group',
          'fields' => [
            'soc_link' => [
              'caption' => 'Ссылка на соцсеть',
              'type' => 'text',
            ],
            'soc_img' => [
              'caption' => 'Иконка соцсети 23x23 px',
              'type' => 'image',
            ],
          ]
        ],

        'content' => [
          'caption' => 'Текст отзыва',
          'type' => 'richtext',
          'default' => '',
          'theme' => 'editor',
          'options' => [
            'height' => '300px',
          ],
        ],

        'original_review_doc' => [
          'caption' => 'Изображение оригинального отзыва (скрин)',
          'type' => 'image',
        ],
      ],
    ],
  ],
  'prepare' => function ($options, &$values) {

    //Заголовок
    if ($values['title'] != '') {
      $values['title'] = "
            <h2>
                {$values['title']}
            </h2>";
    }

    //Ссылка Все отзывы
    if (!empty($values['more_link_text']) && !empty($values['more_link_url'])) {
      $values['more_link'] = "<a href=\"{$values['more_link_url']}\" class=\"primary-button\">{$values['more_link_text']}</a>";
    }

    foreach ($values['reviews'] as &$reviews) {
      //Имя оставившего отзыв.
      if ($reviews['name'] != '') {
        $reviews['name'] = "
                    <div class=\"card-reviews-el-header__name\">
                        {$reviews['name']}
                    </div>";
      }

      //Должность оставившего отзыв
      if ($reviews['position_review'] != '') {
        $reviews['position_review'] = "
                    <div class=\"card-reviews-el-header__post\">
                        {$reviews['position_review']}
                    </div>";
      }


      //Ссылка подробнее
      $text_lenth_setup = 250;
      $text_lenth = mb_strlen($reviews['content']);
      if (!empty($text_lenth) && $text_lenth >= $text_lenth_setup) {
        $reviews['more_link'] = "
                                        <a href=\"#\" class=\"card-reviews-el__more\"><span>Читать подробнее...</span></a>";
      } else {
        $reviews['more_link'] = '';
      }

      //Фотография оригинала попап
      if (!empty($reviews['original_review_doc'])) {
        $reviews['original_review_doc'] = <<<EOL
                                    <a href="{$reviews['original_review_doc']}" class="fancyshow">
                                        <svg width="16" height="19" viewBox="0 0 16 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="Canvas__newspaper" transform="translate(-1411 -1954)">
                                                <g id="document__newspaper">
                                                    <use xlink:href="#path0__newspaper" transform="translate(1412 1954.5)" />
                                                </g>
                                            </g>
                                            <defs>
                                                <path id="path0__newspaper" d="M 0 0L 0 -0.5L -0.5 -0.5L -0.5 0L 0 0ZM 0 18L -0.5 18L -0.5 18.5L 0 18.5L 0 18ZM 14 18L 14 18.5L 14.5 18.5L 14.5 18L 14 18ZM 14 4L 14.5 4L 14.5 3.79289L 14.3536 3.64645L 14 4ZM 10 0L 10.3536 -0.353553L 10.2071 -0.5L 10 -0.5L 10 0ZM 10 4L 9.5 4L 9.5 4.5L 10 4.5L 10 4ZM 3 4.5C 2.72386 4.5 2.5 4.72386 2.5 5C 2.5 5.27614 2.72386 5.5 3 5.5L 3 4.5ZM 6 5.5C 6.27614 5.5 6.5 5.27614 6.5 5C 6.5 4.72386 6.27614 4.5 6 4.5L 6 5.5ZM 3 6.5C 2.72386 6.5 2.5 6.72386 2.5 7C 2.5 7.27614 2.72386 7.5 3 7.5L 3 6.5ZM 4 7.5C 4.27614 7.5 4.5 7.27614 4.5 7C 4.5 6.72386 4.27614 6.5 4 6.5L 4 7.5ZM 5.5 6.5C 5.22386 6.5 5 6.72386 5 7C 5 7.27614 5.22386 7.5 5.5 7.5L 5.5 6.5ZM 6 7.5C 6.27614 7.5 6.5 7.27614 6.5 7C 6.5 6.72386 6.27614 6.5 6 6.5L 6 7.5ZM 7.5 6.5C 7.22386 6.5 7 6.72386 7 7C 7 7.27614 7.22386 7.5 7.5 7.5L 7.5 6.5ZM 9 7.5C 9.27614 7.5 9.5 7.27614 9.5 7C 9.5 6.72386 9.27614 6.5 9 6.5L 9 7.5ZM 10.5 6.5C 10.2239 6.5 10 6.72386 10 7C 10 7.27614 10.2239 7.5 10.5 7.5L 10.5 6.5ZM 11 7.5C 11.2761 7.5 11.5 7.27614 11.5 7C 11.5 6.72386 11.2761 6.5 11 6.5L 11 7.5ZM 3 8.5C 2.72386 8.5 2.5 8.72386 2.5 9C 2.5 9.27614 2.72386 9.5 3 9.5L 3 8.5ZM 3.5 9.5C 3.77614 9.5 4 9.27614 4 9C 4 8.72386 3.77614 8.5 3.5 8.5L 3.5 9.5ZM 5 8.5C 4.72386 8.5 4.5 8.72386 4.5 9C 4.5 9.27614 4.72386 9.5 5 9.5L 5 8.5ZM 7 9.5C 7.27614 9.5 7.5 9.27614 7.5 9C 7.5 8.72386 7.27614 8.5 7 8.5L 7 9.5ZM 9 8.5C 8.72386 8.5 8.5 8.72386 8.5 9C 8.5 9.27614 8.72386 9.5 9 9.5L 9 8.5ZM 11 9.5C 11.2761 9.5 11.5 9.27614 11.5 9C 11.5 8.72386 11.2761 8.5 11 8.5L 11 9.5ZM 3 10.5C 2.72386 10.5 2.5 10.7239 2.5 11C 2.5 11.2761 2.72386 11.5 3 11.5L 3 10.5ZM 7 11.5C 7.27614 11.5 7.5 11.2761 7.5 11C 7.5 10.7239 7.27614 10.5 7 10.5L 7 11.5ZM 8.5 10.5C 8.22386 10.5 8 10.7239 8 11C 8 11.2761 8.22386 11.5 8.5 11.5L 8.5 10.5ZM 9 11.5C 9.27614 11.5 9.5 11.2761 9.5 11C 9.5 10.7239 9.27614 10.5 9 10.5L 9 11.5ZM 10.5 10.5C 10.2239 10.5 10 10.7239 10 11C 10 11.2761 10.2239 11.5 10.5 11.5L 10.5 10.5ZM 11 11.5C 11.2761 11.5 11.5 11.2761 11.5 11C 11.5 10.7239 11.2761 10.5 11 10.5L 11 11.5ZM 3 12.5C 2.72386 12.5 2.5 12.7239 2.5 13C 2.5 13.2761 2.72386 13.5 3 13.5L 3 12.5ZM 7 13.5C 7.27614 13.5 7.5 13.2761 7.5 13C 7.5 12.7239 7.27614 12.5 7 12.5L 7 13.5ZM 9 12.5C 8.72386 12.5 8.5 12.7239 8.5 13C 8.5 13.2761 8.72386 13.5 9 13.5L 9 12.5ZM 11 13.5C 11.2761 13.5 11.5 13.2761 11.5 13C 11.5 12.7239 11.2761 12.5 11 12.5L 11 13.5ZM -0.5 0L -0.5 18L 0.5 18L 0.5 0L -0.5 0ZM 0 18.5L 14 18.5L 14 17.5L 0 17.5L 0 18.5ZM 14.5 18L 14.5 4L 13.5 4L 13.5 18L 14.5 18ZM 14.3536 3.64645L 10.3536 -0.353553L 9.64645 0.353553L 13.6464 4.35355L 14.3536 3.64645ZM 10 -0.5L 0 -0.5L 0 0.5L 10 0.5L 10 -0.5ZM 9.5 0L 9.5 4L 10.5 4L 10.5 0L 9.5 0ZM 10 4.5L 14 4.5L 14 3.5L 10 3.5L 10 4.5ZM 3 5.5L 6 5.5L 6 4.5L 3 4.5L 3 5.5ZM 3 7.5L 4 7.5L 4 6.5L 3 6.5L 3 7.5ZM 5.5 7.5L 6 7.5L 6 6.5L 5.5 6.5L 5.5 7.5ZM 7.5 7.5L 9 7.5L 9 6.5L 7.5 6.5L 7.5 7.5ZM 10.5 7.5L 11 7.5L 11 6.5L 10.5 6.5L 10.5 7.5ZM 3 9.5L 3.5 9.5L 3.5 8.5L 3 8.5L 3 9.5ZM 5 9.5L 7 9.5L 7 8.5L 5 8.5L 5 9.5ZM 9 9.5L 11 9.5L 11 8.5L 9 8.5L 9 9.5ZM 3 11.5L 7 11.5L 7 10.5L 3 10.5L 3 11.5ZM 8.5 11.5L 9 11.5L 9 10.5L 8.5 10.5L 8.5 11.5ZM 10.5 11.5L 11 11.5L 11 10.5L 10.5 10.5L 10.5 11.5ZM 3 13.5C 4.5621 13.5 5.4379 13.5 7 13.5L 7 12.5C 5.4379 12.5 4.5621 12.5 3 12.5L 3 13.5ZM 9 13.5L 11 13.5L 11 12.5L 9 12.5L 9 13.5Z" />
        </defs>
    </svg>
    <span>Смотреть оригинал</span>
</a>
EOL;
      }
    }
    unset($reviews);
  }
];
