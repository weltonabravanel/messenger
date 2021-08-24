/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/pages/index.init.js":
/*!******************************************!*\
  !*** ./resources/js/pages/index.init.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
    Template Name: Chatvia - Responsive Bootstrap 4 Chat App
    Author: Themesbrand
    Version: 1.0.0
    Website: https://themesbrand.com/
    Contact: themesbrand@gmail.com
    File: Index init js
*/
var receiver_userid = "";

(function ($) {
  'use strict';

  $('.popup-img').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  }); // user-status carousel

  $('#user-status-carousel').owlCarousel({
    items: 4,
    loop: false,
    margin: 16,
    nav: false,
    dots: false
  }); // filter hide/show

  $(document).on("click", "#user-profile-hide", function () {
    $(".user-profile-sidebar").hide();
  });
  $(document).on("click", ".user-profile-show", function () {
    $(".user-profile-sidebar").show();
    $(".group-profile-sidebar").hide();
  }); // chat user responsive hide show

  $(".chat-user-list li").on('click', function () {
    $(".user-chat").addClass("user-chat-show");
  });
  $(".user-chat-remove").on('click', function () {
    $(".user-chat").removeClass("user-chat-show");
  });
  /**
   *-------------------------------------------------------------
   * Token
   *-------------------------------------------------------------
   */

  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  });
  /**
   *-------------------------------------------------------------
   * Pusher Channel
   *-------------------------------------------------------------
   */
  // Enable pusher logging - don't include this in production

  Pusher.logToConsole = false;
  var pusher = new Pusher("ADD_YOUR_PUSHER_APP_KEY", {
    cluster: "ap2",
    forceTLS: true
  });
  var channel = pusher.subscribe("my-channel");
  /**
   *-------------------------------------------------------------
   * My Event
   *-------------------------------------------------------------
   */

  channel.bind("my-event", function (data) {
    if (my_id == data.from_user) {
      if (!data.typing) {
        getlastmessage(data.to_user);
      }
    } else if (my_id == data.to_user) {
      if (receiver_userid == data.from_user) {
        // if receiver is selected, reload the selected user ...
        if (data.typing) {
          addtyping();
        } else {
          getlastmessage(data.from_user);
        }
      } else if (!data.typing) {
        // if receiver is not selected, add notification for that user
        var pending = parseInt($("#user-" + data.from_user).find(".pending").html());

        if (pending) {
          $("#user-" + data.from_user).find(".pending").html(pending + 1);
        } else {
          $("#user-" + data.from_user).append('<div class="unread-message"><span class="badge badge-soft-danger badge-pill pending">1</span></div>');
        }
      } else {// console.log('my-event');
      }
    }
  });
  /**
   *-------------------------------------------------------------
   * Group Message Event
   *-------------------------------------------------------------
   */

  channel.bind("my-group", function (data) {
    var dataid = $(".GROUP").attr("id");

    if (data.group_id == dataid) {
      if (my_id == data.to_user_id) {
        getgrouplastmessage(data.group_id);
      } else {
        $.each(JSON.parse(JSON.stringify(data.group_users)), function (key, value) {
          if (value.id == my_id) {
            getgrouplastmessage(data.group_id);
          }
        });
      }
    }
  });
  /**
   *-------------------------------------------------------------
   * User name Update
   *-------------------------------------------------------------
   */

  $(document).on("click", "#btnName", function (event) {
    var text = document.getElementById("profile-newname");
    var nametext = $("#profile-name").val(text.textContent || text.innerText);
    $("#profile-newname").css("display", "none");
    $("#profile-name").css("display", "block");
    $("#btnName").css("display", "none");
    $("#btnSave").css("display", "block");
  });
  
  $(document).on("click", "#btnSave", function () {
    $("#btnName").css("display", "block");
    $("#btnSave").css("display", "none");
    $("#profile-newname").css("display", "block");
    $("#profile-name").css("display", "none");
    var texts = document.getElementById("profile-name").value;
    $.ajax({
      url: config.routes.nameupdate,
      type: "post",
      data: {
        name: texts
      },
      success: function success(data) {
        var response = $.parseJSON(data);

        if (response.success == 1) {
          $(".profile-newname").text(response.data);
        }
      }
    });
  });
  /**
   *-------------------------------------------------------------
   * Update Profile Avatar
   *-------------------------------------------------------------
   */

  $(document).on("change", "#avatar", function (e) {
    var fd = new FormData();
    var files = $("#avatar")[0].files[0];
    fd.append("file", files);
    $.ajax({
      url: config.routes.updateavatar,
      type: "post",
      data: fd,
      contentType: false,
      processData: false,
      success: function success(data) {
        var response = $.parseJSON(data);

        if (response.success == 1) {
          $(".imgavatar").attr("src", config.routes.url + response.data);
        }
      }
    });
  });
  /**
   *-------------------------------------------------------------
   * Search Contact
   *-------------------------------------------------------------
   */

  $(document).on("keyup", "#search", function () {
    var $value = $(this).val();
    $.ajax({
      type: "get",
      url: "search",
      data: {
        search: $value
      },
      success: function success(data) {
        $(".chat-contactlist").html(data);
      }
    });
  });
  /**
   *-------------------------------------------------------------
   * Search Recent Contact
   *-------------------------------------------------------------
   */

  $(document).on("keyup", "#recentcontactsearch", function () {
    var $value = $(this).val();
    $.ajax({
      type: "get",
      url: "recentsearch",
      data: {
        search: $value
      },
      success: function success(data) {
        $(".chat-message-chatlist").html(data);
      }
    });
  });
  /**
   *-------------------------------------------------------------
   * Chat Message Search
   *-------------------------------------------------------------
   */

  $(document).on("keyup", "#messagesearch", function () {
    var $userid = $(".CHATUSER").attr("id");
    var $value = $(this).val();
    $.ajax({
      type: "get",
      url: "messagesearch",
      data: {
        search: $value,
        userid: $userid
      },
      success: function success(data) {
        $(".chat-conversation #chatul").html(data);
      }
    });
  });
  $(document).on("keyup", ".emoji-wysiwyg-editor", function () {
    var $userid = $(".CHATUSER").attr("id");
    typing($userid);
  });
  /**
   *-------------------------------------------------------------
   * Delete Contact
   *-------------------------------------------------------------
   */

  $("body").on("click", "#deleteContact", function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    var token = $("meta[name='csrf-token']").attr("content");
    var url = e.target;
    $.ajax({
      url: url.href,
      //or you can use url: "users/"+id,
      type: "DELETE",
      data: {
        _token: token,
        id: id
      },
      success: function success(data) {
        $(".chat-contactlist").html(data);
      }
    });
  });
  /**
   *-------------------------------------------------------------
   * Group:- Search Group Name
   *-------------------------------------------------------------
   */

  $("#groupsearch").on("keyup", function () {
    var $value = $(this).val();
    $.ajax({
      type: "get",
      url: "groupsearch",
      data: {
        search: $value
      },
      success: function success(data) {
        $("#chat-group-list").html(data);
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Group Message Search
  *-------------------------------------------------------------
  */

  $(document).on("keyup", "#groupmessagesearch", function () {
    var $groupid = $(".GROUP").attr("id");
    var $value = $(this).val();
    $.ajax({
      type: "get",
      url: "groupmessagesearch",
      data: {
        search: $value,
        groupid: $groupid
      },
      success: function success(data) {
        $(".chat-conversation #chatgroup-ul").html(data);
      }
    });
  });
  $(document).on("click", "#profile-tab", function () {
    $(".side-menu-nav").find("#pills-user-tab").trigger("click");
  });
  $(document).on("click", "#setting-tab", function () {
    $(".side-menu-nav").find("#pills-setting-tab").trigger("click");
  });
  /**
   *-------------------------------------------------------------
  * File Upload In Chat
  *-------------------------------------------------------------
  */

  $(document).on("change", "#fileUpload", function (e) {
    e.preventDefault();
    var ext = this.value.match(/\.(.+)$/)[1];
    console.log('ext: '+ext);
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            break;
        default:
            alert('Allowed file type(jpg, jpeg, png, gif)');
            return false;
    }

    var receiver_id = $(this).attr('data-user');
    var fd = new FormData();
    var abcfiles = $("#fileUpload")[0].files[0];
    fd.append("file", abcfiles);
    fd.append("receiver_id", receiver_id);
    fd.append("message", abcfiles.name);
    $.ajax({
      type: "post",
      url: "message",
      // need to create this post route
      data: fd,
      cache: false,
      processData: false,
      contentType: false,
      success: function success(data) {},
      error: function error(jqXHR, status, err) {},
      complete: function complete() {
        scrollToBottomFunc();
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Show and Hide Profile Detail
  *-------------------------------------------------------------
  */

  $(document).on("click", ".show-sidebar", function () {
    $(".user-profile-sidebar.user").show();
    $(".user-profile-sidebar.group-profile-sidebar").hide();
  });
  $(document).on("click", "#user-profile-hide", function () {
    $(".user-profile-sidebar.user").hide();
  });
  $(document).on("click", ".user-group-show", function () {
    $(".user-profile-sidebar.group-profile-sidebar").show();
    $(".user-profile-sidebar.user").hide();
  }); // chat user responsive hide show

  $(document).on("click", "#chat-group-list li", function () {
    $(".user-chat").addClass("user-chat-show");
  });
  $(document).on("click", ".user-chat-remove", function () {
    $(".user-chat").removeClass("user-chat-show");
  });
  /**
   *-------------------------------------------------------------
  * Send Message
  *-------------------------------------------------------------
  */

  $(document).on("click", ".send-chat-message", function () {
    var receiver_id = $(this).attr('data-user');
    var message = $(".chat-input input").val(); // check if enter key is pressed and message is not null also receiver is selected

    if (message.trim() != "" && receiver_id != "") {
      $(".emoji-wysiwyg-editor").empty();
      $(".chat-input input").val(""); // while pressed enter text box will be empty

      var datastr = "receiver_id=" + receiver_id + "&message=" + message;
      $.ajax({
        type: "post",
        url: "message",
        // need to create this post route
        data: datastr,
        cache: false,
        success: function success(data) {// getlastmessage(receiver_id);
        },
        error: function error(jqXHR, status, err) {},
        complete: function complete() {
          scrollToBottomFunc();
        }
      });
    }
  });
  /**
   *-------------------------------------------------------------
  * Typing
  *-------------------------------------------------------------
  */

  function typing(receiver_id) {
    var datastr = "receiver_id=" + receiver_id;
    $.ajax({
      type: "post",
      url: "typing",
      // need to create this post route
      data: datastr,
      cache: false,
      success: function success(data) {},
      error: function error(jqXHR, status, err) {}
    });
  }

  function addtyping() {
    if ($("li").hasClass("typing")) {} else {
      var src = $("#user-profile-sender-img").attr("src");
      var name = document.getElementById("user-profile-sender-name").textContent;
      $(".chat-conversation #chatul").append('<li class="typing"><div class="conversation-list"><div class="chat-avatar"><img src="' + src + '" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">typing<span class="animate-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span></p></div></div><div class="conversation-name">' + name + "</div></div></div></li>");
      setTimeout(function () {
        $(".typing").remove();
      }, 3000);
    }

    scrollToBottomFunc();
  }
  /**
   *-------------------------------------------------------------
  * Create Group
  *-------------------------------------------------------------
  */


  $(document).on("click", ".create-group", function () {
    var testing = document.getElementsByClassName("batchCheckbox");
    var checkVal = [];
    var group_name = $("#group_name").val();
    var description = $("#description").val();
    var fd = new FormData();
    fd.append("group_name", group_name);

    for (var i = 0; i < testing.length; i++) {
      if (testing[i].checked) {
        fd.append("checkVal[]", testing[i].value);
        testing[i].checked = false;
      }
    }

    fd.append("description", description);
    $("#group_name").val("");
    $("#description").val("");
    $.ajax({
      url: config.routes.groups,
      type: "post",
      data: fd,
      contentType: false,
      processData: false,
      success: function success(data) {
        $("#chat-group-list").html(data.groupdata);
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Select Group
  *-------------------------------------------------------------
  */

  $(document).on("click", "ul li.group", function () {
    var id = $(this).attr('group-id');
    $(".group").removeClass("active");
    $("#group-" + id).addClass("active");
    $("#group-" + id).find(".group-unread").remove();
    $("#messages").hide();
    $("#group-messages").show();
    $.ajax({
      type: "get",
      url: "groupmessage/" + id,
      // need to create this route
      data: "",
      cache: false,
      success: function success(data) {
        $("#group-messages").html(data.view1);
        $("#groupprofiledetail").html(data.view2); // scrollToBottomFunc();

        scrollToBottomFuncGroup();
        loademoji();
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Send Group Message
  *-------------------------------------------------------------
  */

  $(document).on("click", ".send-group-message", function () {
    var group_id = $(this).attr('group-id');
    var message = $(".group-chat-input input").val(); // check if enter key is pressed and message is not null also receiver is selected

    if (message.trim() != "" && group_id != "") {
      $(".emoji-wysiwyg-editor").empty();
      $(".group-chat-input input").val(""); // while pressed enter text box will be empty

      var datastr = "group_id=" + group_id + "&message=" + message;
      $.ajax({
        type: "post",
        url: "groupmessage",
        // need to create this post route
        data: datastr,
        cache: false,
        success: function success(data) {// getgrouplastmessage(group_id);
        },
        error: function error(jqXHR, status, err) {},
        complete: function complete() {
          // scrollToBottomFunc();
          scrollToBottomFuncGroup();
        }
      });
    }
  });
  /**
   *-------------------------------------------------------------
  * File Upload Group
  *-------------------------------------------------------------
  */

  $(document).on("change", "#GroupfileUpload", function (e) {
    e.preventDefault();
    var ext = this.value.match(/\.(.+)$/)[1];
    console.log('ext: '+ext);
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            break;
        default:
            alert('Allowed file type(jpg, jpeg, png, gif)');
            return false;
    }

    var group_id = $(this).attr('group-id');
    var fd = new FormData();
    var files = $("#GroupfileUpload")[0].files[0];
    fd.append("file", files);
    fd.append("group_id", group_id);
    fd.append("message", files.name);
    $.ajax({
      type: "post",
      url: "groupmessage",
      // need to create this post route
      data: fd,
      cache: false,
      processData: false,
      contentType: false,
      success: function success(data) {// getgrouplastmessage(data.group_id);
      },
      error: function error(jqXHR, status, err) {},
      complete: function complete() {
        // scrollToBottomFunc();
        scrollToBottomFuncGroup();
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Delete Group Message
  *-------------------------------------------------------------
  */

  $(document).on("click", ".deletegroupmessage", function () {
    var group_id = $(this).attr('group-id');
    document.getElementById("msg-" + group_id).remove();
    $.ajax({
      type: "get",
      url: "deletegroupmessage/" + group_id,
      success: function success(data) {}
    });
  });
  /**
   *-------------------------------------------------------------
  * Delete Chat Message
  *-------------------------------------------------------------
  */

  $(document).on("click", ".deleteMessage", function () {
    var id = $(this).attr('msg-id');
    document.getElementById("msg-" + id).remove();
    $.ajax({
      type: "get",
      url: "deleteMessage/" + id,
      success: function success(data) {}
    });
  });
  /**
   *-------------------------------------------------------------
  * Select User Chat Open
  *-------------------------------------------------------------
  */

  var firstUser = $('.chat-user-list').find('.user').attr('data-id');
  userclick(firstUser);
  $(".chat-message-chatlist ul li").on('click', function () {
    var id = $(this).attr('user-id');
    userclick(id);
  });
  $(".chat-user-click").on('click', function () {
    var id = $(this).attr('user-id');
    userclick(id);
  });

  function userclick(receiver_id) {
    receiver_userid = receiver_id;
    $(".user").removeClass("active");
    $("#user-" + receiver_id).addClass("active");
    $("#user-" + receiver_id).find(".pending").remove();
    $(".user-profile-sidebar.group-profile-sidebar").hide();
    $("#messages").show();
    $("#group-messages").hide();
    $.ajax({
      type: "get",
      url: "message/" + receiver_id,
      // need to create this route
      data: "",
      cache: false,
      success: function success(data) {
        $("#messages").html(data.view1);
        $("#userprofiledetail").html(data.view2);
        scrollToBottomFunc();
        loademoji();
      }
    });
  }
  /**
   *-------------------------------------------------------------
  * scrollToBottom
  *-------------------------------------------------------------
  */


  function scrollToBottomFunc() {
    var height = 0;
    $("#chatul li div").each(function (i, value) {
      height += parseInt($(this).height());
    });
    height += "";
    setTimeout(function () {
      $("#messages #chatul").parent().parent().animate({
        scrollTop: height
      }, 1000);
    }, 100);
  }

  function scrollToBottomFuncGroup() {
    var height = 0;
    $("#chatgroup-ul li div").each(function (i, value) {
      height += parseInt($(this).height());
    });
    height += "";
    setTimeout(function () {
      $("#group-messages #chatgroup-ul").parent().parent().animate({
        scrollTop: height
      }, 1000);
    }, 100);
  }
  /**
   *-------------------------------------------------------------
  * Load Only last messages Chat
  *-------------------------------------------------------------
  */


  function getlastmessage(data) {
    $.ajax({
      type: "get",
      url: "lastmessage/" + data,
      // need to create this route
      data: "",
      cache: false,
      success: function success(data) {
        $(".chat-conversation #chatul").append(data);
        scrollToBottomFunc();
      }
    });
  }
  /**
   *-------------------------------------------------------------
  * Load Only last meassages Group
  *-------------------------------------------------------------
  */


  function getgrouplastmessage(data) {
    $.ajax({
      type: "get",
      url: "grouplastmessage/" + data,
      // need to create this route
      data: "",
      cache: false,
      success: function success(data) {
        $(".chat-conversation #chatgroup-ul").append(data);
        scrollToBottomFunc();
      }
    });
  }
  /**
   *-------------------------------------------------------------
  * Delete Conversation
  *-------------------------------------------------------------
  */


  $(document).on("click", ".deleteConversation", function () {
    var id = $(this).attr('user-id');
    $.ajax({
      type: "get",
      url: "deleteConversation/" + id,
      success: function success(data) {
        $(".chat-conversation #chatul").html("");
      },
      error: function error() {
        console.error("Server error, check your response");
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Delete Group Conversation
  *-------------------------------------------------------------
  */

  $(document).on("click", ".deleteGroupConversation", function () {
    var group_id = $(this).attr('group-id');
    $.ajax({
      type: "get",
      url: "deleteGroupConversation/" + group_id,
      success: function success(data) {
        $(".chat-conversation #chatgroup-ul").html("");
      },
      error: function error() {
        console.error("Server error, check your response");
      }
    });
  });
  /**
   *-------------------------------------------------------------
  * Copy to cliboard
  *-------------------------------------------------------------
  */

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text; // Avoid scrolling to bottom

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }

  $(document).on("click", ".copyTextToClipboard", function () {
    var text = $(this).attr('data-text');

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }

    navigator.clipboard.writeText(text).then(function () {
      console.log("Async: Copying to clipboard was successful!");
    }, function (err) {
      console.error("Async: Could not copy text: ", err);
    });
  });
  /**
   *-------------------------------------------------------------
  * Load Emoji
  *-------------------------------------------------------------
  */

  function loademoji() {
    // Initializes and creates emoji set from sprite sheet
    window.emojiPicker = new EmojiPicker({
      emojiable_selector: "[data-emojiable=true]",
      assetsPath: "vendor/emoji-picker/lib/img/",
      popupButtonClasses: "icon-smile"
    });
    window.emojiPicker.discover();
  }

  function initDropdownMenu() {
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      e.preventDefault();

      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }

      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');
      return false;
    });
  }

  function initComponents() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    $(function () {
      $('[data-toggle="popover"]').popover();
    });
  }

  function initSettings() {
    $("#light-dark").on("click", function (e) {
      e.preventDefault();

      if ($("#bootstrap-style").attr("disabled") !== "disabled") {
        $("#bootstrap-dark-style").attr("disabled", false);
        $("#bootstrap-style").attr("disabled", true);
        $("#app-dark-style").attr("disabled", false);
        $("#app-style").attr("disabled", true);
      } else {
        $("#bootstrap-dark-style").attr("disabled", true);
        $("#bootstrap-style").attr("disabled", false);
        $("#app-dark-style").attr("disabled", true);
        $("#app-style").attr("disabled", false);
      }
    });
  }

  function init() {
    initDropdownMenu();
    initComponents();
    initSettings();
    Waves.init();
  }

  init();
})(jQuery);

/***/ }),

/***/ "./resources/scss/app-dark.scss":
/*!**************************************!*\
  !*** ./resources/scss/app-dark.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/app.scss":
/*!*********************************!*\
  !*** ./resources/scss/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/bootstrap-dark.scss":
/*!********************************************!*\
  !*** ./resources/scss/bootstrap-dark.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/bootstrap.scss":
/*!***************************************!*\
  !*** ./resources/scss/bootstrap.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/scss/icons.scss":
/*!***********************************!*\
  !*** ./resources/scss/icons.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/js/pages/index.init.js ./resources/scss/bootstrap.scss ./resources/scss/bootstrap-dark.scss ./resources/scss/icons.scss ./resources/scss/app.scss ./resources/scss/app-dark.scss ***!
  \**********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /opt/lampp/htdocs/ChatviaLaravel/resources/js/pages/index.init.js */"./resources/js/pages/index.init.js");
__webpack_require__(/*! /opt/lampp/htdocs/ChatviaLaravel/resources/scss/bootstrap.scss */"./resources/scss/bootstrap.scss");
__webpack_require__(/*! /opt/lampp/htdocs/ChatviaLaravel/resources/scss/bootstrap-dark.scss */"./resources/scss/bootstrap-dark.scss");
__webpack_require__(/*! /opt/lampp/htdocs/ChatviaLaravel/resources/scss/icons.scss */"./resources/scss/icons.scss");
__webpack_require__(/*! /opt/lampp/htdocs/ChatviaLaravel/resources/scss/app.scss */"./resources/scss/app.scss");
module.exports = __webpack_require__(/*! /opt/lampp/htdocs/ChatviaLaravel/resources/scss/app-dark.scss */"./resources/scss/app-dark.scss");


/***/ })

/******/ });